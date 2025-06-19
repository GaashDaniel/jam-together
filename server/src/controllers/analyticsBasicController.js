import JamEvent from "../models/JamEvent.js";
import User from "../models/User.js";
import JoinRequest from "../models/JoinRequest.js";
export const getBasicAnalytics = async () => {
  const totalUsers = await User.countDocuments();
  const totalEvents = await JamEvent.countDocuments();
  const totalRequests = await JoinRequest.countDocuments();
  const activeUsers = await User.aggregate([
    {
      $lookup: {
        from: "jamevents",
        localField: "_id",
        foreignField: "createdBy",
        as: "createdEvents",
      },
    },
    {
      $lookup: {
        from: "joinrequests",
        localField: "_id",
        foreignField: "requester",
        as: "joinRequests",
      },
    },
    {
      $match: {
        $or: [
          { "createdEvents.0": { $exists: true } },
          { "joinRequests.0": { $exists: true } },
        ],
      },
    },
    { $count: "activeUsers" },
  ]);
  return {
    totalUsers,
    totalEvents,
    totalRequests,
    activeUsers: activeUsers[0]?.activeUsers || 0,
  };
};