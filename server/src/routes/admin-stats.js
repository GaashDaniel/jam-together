import express from "express";
import User from "../models/User.js";
import JamEvent from "../models/JamEvent.js";
import JoinRequest from "../models/JoinRequest.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";
const router = express.Router();
router.use(authenticate);
router.use(requireAdmin);
router.get("/", async (req, res) => {
  try {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const [totalUsers, totalEvents, recentUsers, recentEvents, flaggedContent] =
      await Promise.all([
        User.countDocuments(),
        JamEvent.countDocuments(),
        User.countDocuments({
          createdAt: { $gte: oneWeekAgo },
        }),
        JamEvent.countDocuments({
          createdAt: { $gte: oneWeekAgo },
        }),
        JamEvent.countDocuments({ status: "flagged" }),
      ]);
    const [usersWithEvents, usersWithRequests] = await Promise.all([
      User.aggregate([
        {
          $lookup: {
            from: "jamevents",
            localField: "_id",
            foreignField: "createdBy",
            as: "events",
          },
        },
        {
          $match: {
            "events.0": { $exists: true },
          },
        },
        {
          $count: "count",
        },
      ]),
      User.aggregate([
        {
          $lookup: {
            from: "joinrequests",
            localField: "_id",
            foreignField: "requester",
            as: "requests",
          },
        },
        {
          $match: {
            "requests.0": { $exists: true },
          },
        },
        {
          $count: "count",
        },
      ]),
    ]);
    const activeUsersAggregate = await User.aggregate([
      {
        $lookup: {
          from: "jamevents",
          localField: "_id",
          foreignField: "createdBy",
          as: "events",
        },
      },
      {
        $lookup: {
          from: "joinrequests",
          localField: "_id",
          foreignField: "requester",
          as: "requests",
        },
      },
      {
        $match: {
          $or: [
            { "events.0": { $exists: true } },
            { "requests.0": { $exists: true } },
          ],
        },
      },
      {
        $count: "count",
      },
    ]);
    const activeUsers =
      activeUsersAggregate.length > 0 ? activeUsersAggregate[0].count : 0;
    const upcomingEvents = await JamEvent.countDocuments({
      scheduledTo: { $gt: now },
    });
    res.json({
      totalUsers,
      totalEvents,
      activeUsers,
      upcomingEvents,
      recentUsers,
      recentEvents,
      flaggedContent,
      growth: {
        usersThisWeek: recentUsers,
        eventsThisWeek: recentEvents,
      },
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    res.status(500).json({ error: "Failed to fetch statistics" });
  }
});
export default router;