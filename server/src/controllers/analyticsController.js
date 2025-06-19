import { getBasicAnalytics } from "./analyticsBasicController.js";
import { getEventAnalytics } from "./analyticsEventController.js";
import { getUserAnalytics } from "./analyticsUserController.js";
import JoinRequest from "../models/JoinRequest.js";
export const getAnalytics = async (req, res) => {
  try {
    const basicAnalytics = await getBasicAnalytics();
    const eventAnalytics = await getEventAnalytics();
    const userAnalytics = await getUserAnalytics();
    const requestStats = await JoinRequest.aggregate([
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $eq: ["$approvalStatus", null] }, then: "pending" },
                { case: { $eq: ["$approvalStatus", true] }, then: "approved" },
                { case: { $eq: ["$approvalStatus", false] }, then: "denied" },
              ],
              default: "pending",
            },
          },
          count: { $sum: 1 },
        },
      },
    ]);
    const mostRequestedEvents = await JoinRequest.aggregate([
      {
        $match: {
          jamEvent: { $exists: true, $ne: null },
        },
      },
      {
        $lookup: {
          from: "jamevents",
          localField: "jamEvent",
          foreignField: "_id",
          as: "event",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "event.createdBy",
          foreignField: "_id",
          as: "eventCreator",
        },
      },
      {
        $group: {
          _id: "$jamEvent",
          requestCount: { $sum: 1 },
          approvedCount: {
            $sum: {
              $cond: [{ $eq: ["$approvalStatus", true] }, 1, 0],
            },
          },
          pendingCount: {
            $sum: {
              $cond: [{ $eq: ["$approvalStatus", null] }, 1, 0],
            },
          },
          deniedCount: {
            $sum: {
              $cond: [{ $eq: ["$approvalStatus", false] }, 1, 0],
            },
          },
          eventTitle: { $first: { $arrayElemAt: ["$event.title", 0] } },
          eventCreator: {
            $first: { $arrayElemAt: ["$eventCreator.username", 0] },
          },
          eventDate: { $first: { $arrayElemAt: ["$event.scheduledTo", 0] } },
        },
      },
      {
        $project: {
          requestCount: 1,
          approvedCount: 1,
          pendingCount: 1,
          deniedCount: 1,
          eventTitle: 1,
          eventCreator: 1,
          eventDate: 1,
          approvalRate: {
            $cond: [
              { $eq: ["$requestCount", 0] },
              0,
              {
                $multiply: [
                  { $divide: ["$approvedCount", "$requestCount"] },
                  100,
                ],
              },
            ],
          },
        },
      },
      { $sort: { requestCount: -1 } },
      { $limit: 8 },
    ]);
    const requestResponseTimes = await JoinRequest.aggregate([
      {
        $match: {
          approvalStatus: { $in: [true, false] },
          editedAt: { $exists: true },
        },
      },
      {
        $project: {
          approvalStatus: 1,
          status: {
            $cond: [{ $eq: ["$approvalStatus", true] }, "approved", "denied"],
          },
          responseTimeHours: {
            $divide: [
              { $subtract: ["$editedAt", "$createdAt"] },
              1000 * 60 * 60,
            ],
          },
        },
      },
      {
        $group: {
          _id: "$status",
          avgResponseTimeHours: { $avg: "$responseTimeHours" },
          count: { $sum: 1 },
        },
      },
    ]);
    const mostActiveRequesters = await JoinRequest.aggregate([
      {
        $match: {
          requester: { $exists: true, $ne: null },
        },
      },
      {
        $group: {
          _id: "$requester",
          totalRequests: { $sum: 1 },
          approvedRequests: {
            $sum: {
              $cond: [{ $eq: ["$approvalStatus", true] }, 1, 0],
            },
          },
          pendingRequests: {
            $sum: {
              $cond: [{ $eq: ["$approvalStatus", null] }, 1, 0],
            },
          },
          deniedRequests: {
            $sum: {
              $cond: [{ $eq: ["$approvalStatus", false] }, 1, 0],
            },
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          totalRequests: 1,
          approvedRequests: 1,
          pendingRequests: 1,
          deniedRequests: 1,
          username: { $arrayElemAt: ["$user.username", 0] },
          successRate: {
            $cond: [
              { $eq: ["$totalRequests", 0] },
              0,
              {
                $multiply: [
                  { $divide: ["$approvedRequests", "$totalRequests"] },
                  100,
                ],
              },
            ],
          },
        },
      },
      {
        $match: {
          username: { $exists: true, $ne: null },
        },
      },
      { $sort: { totalRequests: -1 } },
      { $limit: 10 },
    ]);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const requestTrends = await JoinRequest.aggregate([
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
            status: {
              $switch: {
                branches: [
                  { case: { $eq: ["$approvalStatus", null] }, then: "pending" },
                  {
                    case: { $eq: ["$approvalStatus", true] },
                    then: "approved",
                  },
                  { case: { $eq: ["$approvalStatus", false] }, then: "denied" },
                ],
                default: "pending",
              },
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);
    res.json({
      summary: basicAnalytics,
      ...eventAnalytics,
      ...userAnalytics,
      requestStats,
      mostRequestedEvents,
      requestResponseTimes,
      mostActiveRequesters,
      requestTrends,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({ error: "Failed to fetch analytics data" });
  }
};