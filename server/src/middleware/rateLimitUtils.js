import { RateLimiterMemory } from "rate-limiter-flexible";
import { RATE_LIMIT_CONFIG, disableRateLimits } from "./securityConfig.js";
export const rateLimiters = {};
Object.keys(RATE_LIMIT_CONFIG).forEach((key) => {
  rateLimiters[key] = new RateLimiterMemory(RATE_LIMIT_CONFIG[key]);
});
export const setRateLimitHeaders = (res, limiter, resRateLimiter) => {
  if (resRateLimiter) {
    res.set({
      "X-RateLimit-Limit": limiter.points,
      "X-RateLimit-Remaining": resRateLimiter.remainingPoints || 0,
      "X-RateLimit-Reset": new Date(
        Date.now() + (resRateLimiter.msBeforeNext || 0)
      ).toISOString(),
    });
  }
};
export const setDevModeHeaders = (res) => {
  res.set({
    "X-RateLimit-Disabled": "true",
    "X-RateLimit-DevMode": "true",
    "X-RateLimit-Limit": "unlimited",
    "X-RateLimit-Remaining": "unlimited",
  });
};
export const getRateLimitKey = (req) => {
  return req.user?.id || req.ip;
};
export const handleRateLimitExceeded = (req, res, limiterType, rejRes) => {
  const remainingPoints = rejRes.remainingPoints || 0;
  const msBeforeNext = rejRes.msBeforeNext || 1;
  const reset = new Date(Date.now() + msBeforeNext);
  res.set({
    "X-RateLimit-Limit": rateLimiters[limiterType].points,
    "X-RateLimit-Remaining": remainingPoints,
    "X-RateLimit-Reset": reset.toISOString(),
    "Retry-After": Math.round(msBeforeNext / 1000) || 1,
  });
  console.warn(`Rate limit exceeded for ${limiterType}:`, {
    ip: req.ip,
    userId: req.user?.id,
    endpoint: req.path,
    userAgent: req.get("User-Agent"),
    remainingPoints,
    resetTime: reset,
  });
  res.status(429).json({
    error: "Too Many Requests",
    message: `Rate limit exceeded for ${limiterType} operations. Please try again later.`,
    retryAfter: Math.round(msBeforeNext / 1000),
    resetTime: reset.toISOString(),
  });
};
export const applyRateLimit = async (req, res, limiterType) => {
  if (disableRateLimits) {
    setDevModeHeaders(res);
    return true;
  }
  const limiter = rateLimiters[limiterType];
  if (!limiter) {
    console.warn(`Unknown rate limiter type: ${limiterType}`);
    return true; 
  }
  try {
    const key = getRateLimitKey(req);
    await limiter.consume(key);
    const resRateLimiter = await limiter.get(key);
    setRateLimitHeaders(res, limiter, resRateLimiter);
    return true; 
  } catch (rejRes) {
    handleRateLimitExceeded(req, res, limiterType, rejRes);
    return false; 
  }
};
export const createRateLimiter = (limiterType) => {
  return async (req, res, next) => {
    const allowed = await applyRateLimit(req, res, limiterType);
    if (allowed) {
      next();
    }
  };
};