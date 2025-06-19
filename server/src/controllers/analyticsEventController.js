import JamEvent from "../models/JamEvent.js";
export const getEventAnalytics = async () => {
  const eventPopularity = await JamEvent.aggregate([
    {
      $project: {
        title: 1,
        createdBy: 1,
        likesCount: { $size: "$likes" },
        requestsCount: { $size: { $ifNull: ["$requests", []] } },
        createdAt: 1,
        scheduledTo: 1,
      },
    },
    { $sort: { likesCount: -1 } },
    { $limit: 10 },
  ]);
  const mostLikedEvents = await JamEvent.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "createdBy",
        foreignField: "_id",
        as: "creator",
      },
    },
    {
      $project: {
        title: 1,
        creator: { $arrayElemAt: ["$creator.username", 0] },
        likesCount: { $size: "$likes" },
        createdAt: 1,
        scheduledTo: 1,
      },
    },
    { $sort: { likesCount: -1 } },
    { $limit: 5 },
  ]);
  const genrePopularity = await JamEvent.aggregate([
    { $unwind: "$genres" },
    {
      $group: {
        _id: "$genres",
        count: { $sum: 1 },
        totalLikes: { $sum: { $size: "$likes" } },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]);
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const eventsOverTime = await JamEvent.aggregate([
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
    eventPopularity,
    mostLikedEvents,
    genrePopularity,
    eventsOverTime,
  };
};