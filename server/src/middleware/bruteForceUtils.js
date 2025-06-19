import { RateLimiterMemory } from "rate-limiter-flexible";
import { BRUTE_FORCE_CONFIG, disableRateLimits } from "./securityConfig.js";
export const bruteForceProtection = {};
Object.keys(BRUTE_FORCE_CONFIG).forEach((key) => {
  bruteForceProtection[key] = new RateLimiterMemory(BRUTE_FORCE_CONFIG[key]);
});
export const getBruteForceKey = (protectionType, req) => {
  switch (protectionType) {
    case "failedLogins":
      return `${req.ip}_${req.body.email || req.body.username || ""}`;
    case "failedPasswordResets":
      return `${req.ip}_${req.body.email || ""}`;
    default:
      return req.ip;
  }
};
export const setBruteForceDevHeaders = (res) => {
  res.set({
    "X-BruteForce-Disabled": "true",
    "X-BruteForce-DevMode": "true",
  });
};
export const handleBruteForceExceeded = (req, res, protectionType, rejRes) => {
  const msBeforeNext = rejRes.msBeforeNext || 1;
  const reset = new Date(Date.now() + msBeforeNext);
  console.warn(`Brute force protection triggered for ${protectionType}:`, {
    ip: req.ip,
    identifier: req.body.email || req.body.username || "unknown",
    endpoint: req.path,
    userAgent: req.get("User-Agent"),
    resetTime: reset,
  });
  res.status(429).json({
    error: "Too Many Failed Attempts",
    message: `Account temporarily locked due to multiple failed attempts. Please try again later.`,
    retryAfter: Math.round(msBeforeNext / 1000),
    resetTime: reset.toISOString(),
  });
};
export const applyBruteForceProtection = async (req, res, protectionType) => {
  if (disableRateLimits) {
    setBruteForceDevHeaders(res);
    return true;
  }
  const protection = bruteForceProtection[protectionType];
  if (!protection) {
    console.warn(`Unknown brute force protection type: ${protectionType}`);
    return true; 
  }
  try {
    const key = getBruteForceKey(protectionType, req);
    await protection.consume(key);
    req.bruteForceKey = key;
    return true; 
  } catch (rejRes) {
    handleBruteForceExceeded(req, res, protectionType, rejRes);
    return false; 
  }
};
export const applyBruteForcePenalty = async (req, protectionType) => {
  if (disableRateLimits) return;
  const protection = bruteForceProtection[protectionType];
  if (!protection || !req.bruteForceKey) return;
  try {
    await protection.penalty(req.bruteForceKey);
  } catch (error) {
    console.error(
      `Error applying brute force penalty for ${protectionType}:`,
      error
    );
  }
};
export const createBruteForceProtection = (protectionType) => {
  return async (req, res, next) => {
    const allowed = await applyBruteForceProtection(req, res, protectionType);
    if (allowed) {
      next();
    }
  };
};
export const createBruteForcePenalty = (protectionType) => {
  return async (req, res, next) => {
    await applyBruteForcePenalty(req, protectionType);
    next();
  };
};