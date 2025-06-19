import User from "../../models/User.js";
import JamEvent from "../../models/JamEvent.js";
import JoinRequest from "../../models/JoinRequest.js";
import mongoose from "mongoose";
export const buildUserFilter = ({ search, role, status }) => {
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
export const buildUserSort = (sortBy = "createdAt", sortOrder = "desc") => {
  const sort = {};
  sort[sortBy] = sortOrder === "desc" ? -1 : 1;
  return sort;
};
export const buildPaginationInfo = (page, limit, total, users) => {
  const skip = (parseInt(page) - 1) * parseInt(limit);
  return {
    current: parseInt(page),
    pages: Math.ceil(total / parseInt(limit)),
    total,
    hasNext: skip + users.length < total,
    hasPrev: parseInt(page) > 1,
  };
};
export const getUserWithDetails = async (userId) => {
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
export const validateSelfAction = (adminUserId, targetUserId, action) => {
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
export const updateUserRole = async (userId, newRole, adminReq) => {
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
export const deleteUserCascade = async (userId, session) => {
  const userEvents = await JamEvent.find({ createdBy: userId }).select("_id");
  const eventIds = userEvents.map((event) => event._id);
  await JoinRequest.deleteMany({ jamEvent: { $in: eventIds } }, { session });
  await JamEvent.deleteMany({ createdBy: userId }, { session });
  await JoinRequest.deleteMany({ requester: userId }, { session });
  await JamEvent.updateMany(
    { likes: userId },
    { $pull: { likes: userId } },
    { session }
  );
  await JamEvent.updateMany(
    { "instruments.playedBy": userId },
    {
      $set: {
        "instruments.$.playedBy": null,
        "instruments.$.requestId": null,
      },
    },
    { session }
  );
  await User.findByIdAndDelete(userId, { session });
  return {
    cascadeDeleted: {
      events: "all",
      joinRequests: "all",
      likes: "removed from all events",
      instrumentAssignments: "removed from all events",
    },
  };
};
export const handleValidationError = (error) => {
  if (error.name === "ValidationError") {
    const firstError = Object.values(error.errors)[0];
    return { status: 400, message: firstError.message };
  }
  if (error.name === "CastError") {
    return { status: 400, message: "Invalid user ID format" };
  }
  return { status: 500, message: "Internal server error" };
};