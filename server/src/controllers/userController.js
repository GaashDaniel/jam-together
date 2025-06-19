import User from "../models/User.js";
import JamEvent from "../models/JamEvent.js";
import JoinRequest from "../models/JoinRequest.js";
import {
  getUsers,
  updateUserRole,
  deleteUser,
  getUserStats,
} from "./userAdminController.js";
export { getUsers, updateUserRole, deleteUser, getUserStats };
export const getCurrentUserEvents = async (req, res) => {
  try {
    const events = await JamEvent.find({ createdBy: req.user._id })
      .populate("createdBy", "username fullName profilePicture")
      .sort({ createdAt: -1 });
    const eventIds = events.map((event) => event._id);
    const requests = await JoinRequest.find({
      jamEvent: { $in: eventIds },
    }).populate("requester", "username fullName profilePicture");
    const eventsWithRequests = events.map((event) => {
      const eventRequests = requests.filter(
        (req) => req.jamEvent.toString() === event._id.toString()
      );
      return {
        ...event.toObject(),
        requests: eventRequests,
        requestCount: eventRequests.length,
      };
    });
    res.json({
      events: eventsWithRequests,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch your events" });
  }
};
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-passwordHash");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const events = await JamEvent.find({ createdBy: user._id })
    .populate("createdBy", "username fullName")
    .sort({ createdAt: -1 })
    .limit(5);
  const joinRequests = await JoinRequest.find({ requester: user._id })
    .populate("jamEvent", "title scheduledTo")
    .sort({ createdAt: -1 });
  res.json({
    user: {
      ...user.toObject(),
      events,
      joinRequests,
    },
  });
};
export const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const events = await JamEvent.find({ createdBy: user._id })
      .populate("createdBy", "username fullName profilePicture")
      .populate("instruments.playedBy", "username fullName")
      .sort({ createdAt: -1 });
    const eventIds = events.map((event) => event._id);
    const requests = await JoinRequest.find({
      jamEvent: { $in: eventIds },
    }).populate("requester", "username fullName profilePicture");
    const eventsWithRequestCounts = events.map((event) => {
      const eventRequests = requests.filter(
        (req) => req.jamEvent.toString() === event._id.toString()
      );
      return {
        ...event.toObject(),
        requestCount: eventRequests.length,
        likes: event.likes || [],
      };
    });
    res.json({
      user: {
        ...user.toObject(),
        events: eventsWithRequestCounts,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
};