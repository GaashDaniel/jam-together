import {
  applySecurity,
  generalRateLimit,
  authRateLimit,
  uploadRateLimit,
  adminRateLimit,
  loginBruteForceProtection,
  loginBruteForcePenalty,
} from "./security.js";
import {
  sanitizeUserInput,
  sanitizeAdminInput,
  sanitizeSearchInput,
  validateContentType,
} from "./sanitization.js";
import { customSecurityHeaders } from "./customSecurityHeaders.js";
export const applyCoreSecurityMiddleware = (app) => {
  app.set("trust proxy", 1);
  app.use(customSecurityHeaders);
  applySecurity(app);
  app.use(validateContentType);
  app.use(generalRateLimit);
};
export const getSecurityMiddleware = () => ({
  authRateLimit,
  uploadRateLimit,
  adminRateLimit,
  loginBruteForceProtection,
  sanitizeUserInput,
  sanitizeAdminInput,
  sanitizeSearchInput,
});