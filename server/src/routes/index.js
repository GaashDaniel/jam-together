import authRoutes from "./authRoutes.js";
import jamEventRoutes from "./jamEventRoutes.js";
import userRoutes from "./userRoutes.js";
import adminRoutes from "./admin.js";
import joinRequestRoutes from "./joinRequestRoutes.js";
import analyticsRoutes from "./analyticsRoutes.js";
import uploadRoutes from "./upload.js";
import instrumentRoutes from "./instruments.js";
export const setupRoutes = (app, securityMiddleware) => {
  const {
    authRateLimit,
    uploadRateLimit,
    adminRateLimit,
    loginBruteForceProtection,
    sanitizeUserInput,
    sanitizeAdminInput,
    sanitizeSearchInput,
  } = securityMiddleware;
  app.use(
    "/api/auth",
    authRateLimit,
    loginBruteForceProtection,
    sanitizeUserInput,
    authRoutes
  );
  app.use("/api/jamEvents", sanitizeUserInput, jamEventRoutes);
  app.use("/api/users", sanitizeSearchInput, userRoutes);
  app.use("/api/admin", adminRateLimit, sanitizeAdminInput, adminRoutes);
  app.use("/api/joinRequests", sanitizeUserInput, joinRequestRoutes);
  app.use(
    "/api/analytics",
    adminRateLimit,
    sanitizeSearchInput,
    analyticsRoutes
  );
  app.use("/api/upload", uploadRateLimit, uploadRoutes);
  app.use("/api/instruments", instrumentRoutes);
  app.use("/api/*", (req, res) => {
    res.status(404).json({
      error: "Not Found",
      message: "The requested API endpoint does not exist.",
      timestamp: new Date().toISOString(),
    });
  });
};