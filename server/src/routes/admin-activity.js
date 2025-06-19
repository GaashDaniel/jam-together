import express from "express";
import User from "../models/User.js";
import JamEvent from "../models/JamEvent.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";
const router = express.Router();
router.use(authenticate);
router.use(requireAdmin);
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 50, type } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const activities = [];
    const recentUsers = await User.find()
      .select("username createdAt")
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();
    recentUsers.forEach((user) => {
      activities.push({
        type: "user_registration",
        user: user.username,
        timestamp: user.createdAt,
        description: `User ${user.username} registered`,
      });
    });
    const recentEvents = await JamEvent.find()
      .select("title createdBy createdAt")
      .populate("createdBy", "username")
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();
    recentEvents.forEach((event) => {
      activities.push({
        type: "event_creation",
        user: event.createdBy.username,
        event: event.title,
        timestamp: event.createdAt,
        description: `Event "${event.title}" created`,
      });
    });
    activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    const total = activities.length;
    const paginatedActivities = activities.slice(skip, skip + parseInt(limit));
    res.json({
      activities: paginatedActivities,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        hasNext: skip + paginatedActivities.length < total,
        hasPrev: parseInt(page) > 1,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch activity logs" });
  }
});
export default router;