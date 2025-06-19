import express from "express";
import User from "../models/User.js";
import JamEvent from "../models/JamEvent.js";
import JoinRequest from "../models/JoinRequest.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";
import {
  validatePagination,
  validateUserFilters,
  validateIdParam,
  validateAdminUserUpdate,
} from "../middleware/validate.js";
import mongoose from "mongoose";
const router = express.Router();
router.use(authenticate);
router.use(requireAdmin);
const buildUserFilter = ({ search, role, status }) => {
  const filter = {};
  if (search) {
    filter.$or = [
      { username: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { fullName: { $regex: search, $options: "i" } },
    ];
  }
  if (role && role !== "all") {
    filter.role = role;
  }
  if (status && status !== "all") {
    filter.status = status;
  }
  return filter;
};
const buildUserSort = (sortBy = "createdAt", sortOrder = "desc") => {
  const sort = {};
  sort[sortBy] = sortOrder === "desc" ? -1 : 1;
  return sort;
};
const buildPaginationInfo = (page, limit, total, users) => {
  const skip = (parseInt(page) - 1) * parseInt(limit);
  return {
    current: parseInt(page),
    pages: Math.ceil(total / parseInt(limit)),
    total,
    hasNext: skip + users.length < total,
    hasPrev: parseInt(page) > 1,
  };
};
const getUserWithDetails = async (userId) => {
  const user = await User.findById(userId).select("-passwordHash").lean();
  if (!user) {
    return null;
  }
  const [userEvents, joinRequests, likedEvents] = await Promise.all([
    JamEvent.find({ createdBy: user._id })
      .select("title scheduledTo createdAt")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean(),
    JoinRequest.find({ requester: user._id })
      .populate("jamEvent", "title scheduledTo")
      .select("jamEvent approvalStatus createdAt")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean(),
    JamEvent.find({ likes: user._id })
      .select("title scheduledTo")
      .sort({ createdAt: -1 })
      .limit(10)
      .lean(),
  ]);
  return {
    ...user,
    eventsCreated: userEvents,
    joinRequests,
    likedEvents,
    stats: {
      eventsCreated: userEvents.length,
      requestsMade: joinRequests.length,
      eventsLiked: likedEvents.length,
    },
  };
};
const validateSelfAction = (adminUserId, targetUserId, action) => {
  if (adminUserId.toString() === targetUserId) {
    const errors = {
      promote: "You are already an admin",
      demote: "You cannot demote yourself from admin",
      delete: "You cannot delete yourself",
      update: "You cannot demote yourself from admin",
    };
    return errors[action] || `Cannot perform ${action} on yourself`;
  }
  return null;
};
const updateUserRole = async (userId, newRole, adminReq) => {
  const oldUser = await User.findById(userId).select("username email role");
  if (!oldUser) {
    throw new Error("User not found");
  }
  const user = await User.findByIdAndUpdate(
    userId,
    { role: newRole },
    { new: true, runValidators: true }
  ).select("-passwordHash");
  return { user, oldUser };
};
const deleteUserCascade = async (userId) => {
  const userEvents = await JamEvent.find({ createdBy: userId }).select("_id");
  const eventIds = userEvents.map((event) => event._id);
  await JoinRequest.deleteMany({ jamEvent: { $in: eventIds } });
  await JamEvent.deleteMany({ createdBy: userId });
  await JoinRequest.deleteMany({ requester: userId });
  await JamEvent.updateMany({ likes: userId }, { $pull: { likes: userId } });
  await JamEvent.updateMany(
    { "instruments.playedBy": userId },
    {
      $set: {
        "instruments.$.playedBy": null,
        "instruments.$.requestId": null,
      },
    }
  );
  await User.findByIdAndDelete(userId);
  return {
    cascadeDeleted: {
      events: "all",
      joinRequests: "all",
      likes: "removed from all events",
      instrumentAssignments: "removed from all events",
    },
  };
};
const handleValidationError = (error) => {
  if (error.name === "ValidationError") {
    const firstError = Object.values(error.errors)[0];
    return { status: 400, message: firstError.message };
  }
  if (error.name === "CastError") {
    return { status: 400, message: "Invalid user ID format" };
  }
  return { status: 500, message: "Internal server error" };
};
router.get("/", validatePagination, validateUserFilters, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      role,
      status,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const filter = buildUserFilter({ search, role, status });
    const sort = buildUserSort(sortBy, sortOrder);
    const [users, total] = await Promise.all([
      User.find(filter)
        .select("-passwordHash")
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      User.countDocuments(filter),
    ]);
    res.json({
      users,
      pagination: buildPaginationInfo(page, limit, total, users),
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to fetch users" });
  }
});
router.get("/:userId", validateIdParam, async (req, res) => {
  try {
    const userWithDetails = await getUserWithDetails(req.params.userId);
    if (!userWithDetails) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ user: userWithDetails });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Failed to fetch user details" });
  }
});
router.patch("/:id/promote", validateIdParam, async (req, res) => {
  try {
    const userId = req.params.id;
    const selfActionError = validateSelfAction(req.user._id, userId, "promote");
    if (selfActionError) {
      return res.status(400).json({ error: selfActionError });
    }
    const { user } = await updateUserRole(userId, "admin", req);
    res.json({
      message: "User promoted to admin successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to promote user" });
  }
});
router.patch("/:id/demote", validateIdParam, async (req, res) => {
  try {
    const userId = req.params.id;
    const selfActionError = validateSelfAction(req.user._id, userId, "demote");
    if (selfActionError) {
      return res.status(400).json({ error: selfActionError });
    }
    const { user } = await updateUserRole(userId, "user", req);
    res.json({
      message: "Admin demoted to user successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to demote user" });
  }
});
router.patch(
  "/:id",
  validateIdParam,
  validateAdminUserUpdate,
  async (req, res) => {
    try {
      const userId = req.params.id;
      const updates = req.body;
      if (req.user._id.toString() === userId && updates.role === "user") {
        const errorMsg = "You cannot demote yourself from admin";
        return res.status(400).json({ error: errorMsg });
      }
      const existingUser = await User.findById(userId).select("-passwordHash");
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }
      const user = await User.findByIdAndUpdate(userId, updates, {
        new: true,
        runValidators: true,
      }).select("-passwordHash");
      res.json({
        message: "User updated successfully",
        user,
      });
    } catch (error) {
      res.status(500).json({ error: error.message || "Failed to update user" });
    }
  }
);
router.delete("/:id", validateIdParam, async (req, res) => {
  try {
    const userId = req.params.id;
    const selfActionError = validateSelfAction(req.user._id, userId, "delete");
    if (selfActionError) {
      return res.status(400).json({ error: selfActionError });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    try {
      const cascadeResult = await deleteUserCascade(userId);
      res.json({
        message: "User and all associated data deleted successfully",
        deletedUser: {
          id: userId,
          username: user.username,
          email: user.email,
        },
      });
    } catch (deleteError) {
      throw deleteError;
    }
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to delete user" });
  }
});
router.get("/search/email", async (req, res) => {
  try {
    const { email, limit = 10 } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Email parameter is required" });
    }
    const users = await User.find({
      email: { $regex: email, $options: "i" },
    })
      .select("-passwordHash")
      .limit(parseInt(limit))
      .lean();
    res.json({
      users,
      count: users.length,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message || "Failed to search by email" });
  }
});
export default router;