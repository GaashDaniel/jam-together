import User from "../models/User.js";
import JamEvent from "../models/JamEvent.js";
import JoinRequest from "../models/JoinRequest.js";
export const getAllUsers = async (req, res) => {
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
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;
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
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        hasNext: skip + users.length < total,
        hasPrev: parseInt(page) > 1,
      },
    });
  } catch (error) {
    console.error("Admin users fetch error:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .select("-passwordHash")
      .lean();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
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
    res.json({
      user: {
        ...user,
        eventsCreated: userEvents,
        joinRequests,
        likedEvents,
        stats: {
          eventsCreated: userEvents.length,
          requestsMade: joinRequests.length,
          eventsLiked: likedEvents.length,
        },
      },
    });
  } catch (error) {
    console.error("Admin user details fetch error:", error);
    res.status(500).json({ error: "Failed to fetch user details" });
  }
};