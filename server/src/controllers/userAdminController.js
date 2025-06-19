import User from "../models/User.js";
import JamEvent from "../models/JamEvent.js";
import JoinRequest from "../models/JoinRequest.js";
export const getUsers = async (req, res) => {
  const { search, role, page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const query = {};
  if (search) {
    query.$or = [
      { username: { $regex: search, $options: "i" } },
      { fullName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }
  if (role) {
    query.role = role;
  }
  const [users, total] = await Promise.all([
    User.find(query)
      .select("-passwordHash")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit)),
    User.countDocuments(query),
  ]);
  res.json({
    users,
    pagination: {
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    },
  });
};
export const updateUserRole = async (req, res) => {
  const { role } = req.body;
  if (!["user", "admin"].includes(role)) {
    return res.status(400).json({ error: "Invalid role" });
  }
  if (role === "user") {
    const adminCount = await User.countDocuments({ role: "admin" });
    if (adminCount <= 1) {
      const user = await User.findById(req.params.id);
      if (user && user.role === "admin") {
        return res.status(400).json({
          error: "Cannot remove the last admin",
        });
      }
    }
  }
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { role },
    { new: true }
  ).select("-passwordHash");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.json({
    message: `User role updated to ${role}`,
    user,
  });
};
export const deleteUser = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  if (user.role === "admin") {
    const adminCount = await User.countDocuments({ role: "admin" });
    if (adminCount <= 1) {
      return res.status(400).json({
        error: "Cannot delete the last admin",
      });
    }
  }
  await Promise.all([
    User.findByIdAndDelete(userId),
    JamEvent.deleteMany({ createdBy: userId }),
    JoinRequest.deleteMany({ requester: userId }),
  ]);
  await JamEvent.updateMany({ likes: userId }, { $pull: { likes: userId } });
  await JamEvent.updateMany(
    { "instruments.playedBy": userId },
    { $set: { "instruments.$.playedBy": null } }
  );
  res.json({
    message: "User deleted successfully",
  });
};
export const getUserStats = async (req, res) => {
  const [totalUsers, adminCount, totalEvents, upcomingEvents, totalRequests] =
    await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "admin" }),
      JamEvent.countDocuments(),
      JamEvent.countDocuments({ scheduledTo: { $gte: new Date() } }),
      JoinRequest.countDocuments(),
    ]);
  res.json({
    stats: {
      totalUsers,
      adminCount,
      regularUsers: totalUsers - adminCount,
      totalEvents,
      upcomingEvents,
      pastEvents: totalEvents - upcomingEvents,
      totalRequests,
    },
  });
};