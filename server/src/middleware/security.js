import { SECURITY_CONFIG } from "./securityConfig.js";
import { createRateLimiter } from "./rateLimitUtils.js";
import {
  createBruteForceProtection,
  createBruteForcePenalty,
} from "./bruteForceUtils.js";
import { checkSuspiciousPatterns } from "./securityPatterns.js";
export const ipSecurityMiddleware = (req, res, next) => {
  const clientIP = req.ip || req.connection.remoteAddress;
  if (SECURITY_CONFIG.blockedIPs.includes(clientIP)) {
    console.warn(`Blocked IP attempt: ${clientIP}`, {
      endpoint: req.path,
      userAgent: req.get("User-Agent"),
      timestamp: new Date().toISOString(),
    });
    return res.status(403).json({
      error: "Access Denied",
      message: "Your IP address has been blocked.",
    });
  }
  res.set({
    "X-Client-IP": clientIP,
    "X-Request-ID": req.id || Math.random().toString(36).substr(2, 9),
  });
  next();
};
export const requestSecurityMiddleware = (req, res, next) => {
  req.setTimeout(SECURITY_CONFIG.requestTimeout, () => {
    res.status(408).json({
      error: "Request Timeout",
      message: "Request took too long to complete.",
    });
  });
  const contentLength = req.get("content-length");
  if (
    contentLength &&
    parseInt(contentLength) > SECURITY_CONFIG.maxRequestSize
  ) {
    return res.status(413).json({
      error: "Payload Too Large",
      message: "Request payload is too large.",
    });
  }
  next();
};
export const securityHeadersMiddleware = (req, res, next) => {
  res.set({
    "X-API-Version": SECURITY_CONFIG.apiVersion,
    "X-Response-Time": Date.now(),
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  });
  res.removeHeader("X-Powered-By");
  res.removeHeader("Server");
  next();
};
export const securityLogMiddleware = (req, res, next) => {
  const startTime = Date.now();
  checkSuspiciousPatterns(req);
  res.on("finish", () => {
    const responseTime = Date.now() - startTime;
    if (responseTime > SECURITY_CONFIG.slowRequestThreshold) {
      console.warn("Slow request detected:", {
        ip: req.ip,
        endpoint: req.path,
        method: req.method,
        responseTime,
        statusCode: res.statusCode,
        timestamp: new Date().toISOString(),
      });
    }
  });
  next();
};
export const applySecurity = (app) => {
  app.use(ipSecurityMiddleware);
  app.use(requestSecurityMiddleware);
  app.use(securityHeadersMiddleware);
  app.use(securityLogMiddleware);
};
export const generalRateLimit = createRateLimiter("general");
export const authRateLimit = createRateLimiter("auth");
export const uploadRateLimit = createRateLimiter("upload");
export const adminRateLimit = createRateLimiter("admin");
export const passwordResetRateLimit = createRateLimiter("passwordReset");
export const loginBruteForceProtection =
  createBruteForceProtection("failedLogins");
export const passwordResetBruteForceProtection = createBruteForceProtection(
  "failedPasswordResets"
);
export const loginBruteForcePenalty = createBruteForcePenalty("failedLogins");
export const passwordResetBruteForcePenalty = createBruteForcePenalty(
  "failedPasswordResets"
);
export { createRateLimiter } from "./rateLimitUtils.js";
export {
  createBruteForceProtection,
  createBruteForcePenalty,
} from "./bruteForceUtils.js";