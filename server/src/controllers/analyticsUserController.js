import User from "../models/User.js";
export const getUserAnalytics = async () => {
  const userEngagement = await User.aggregate([
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
      $project: {
        username: 1,
        eventsCreated: { $size: "$createdEvents" },
        requestsMade: { $size: "$joinRequests" },
        totalActivity: {
          $add: [{ $size: "$createdEvents" }, { $size: "$joinRequests" }],
        },
      },
    },
    { $sort: { totalActivity: -1 } },
    { $limit: 10 },
  ]);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const usersOverTime = await User.aggregate([
    {
      $match: {
        createdAt: { $gte: thirtyDaysAgo },
      },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
  ]);
  return {
    userEngagement,
    usersOverTime,
  };
};