import express from "express";
import adminStatsRoutes from "./admin-stats.js";
import adminUsersRoutes from "./admin-users.js";
import adminEventsRoutes from "./admin-events.js";
import adminActivityRoutes from "./admin-activity.js";
const router = express.Router();
router.use("/stats", adminStatsRoutes);
router.use("/users", adminUsersRoutes);
router.use("/events", adminEventsRoutes);
router.use("/activity", adminActivityRoutes);
export default router;