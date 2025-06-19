import JamEvent from "../models/JamEvent.js";
import JoinRequest from "../models/JoinRequest.js";
export const getUserFavorites = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }
    const favoriteEvents = await JamEvent.find({
      likes: req.user._id,
    })
      .populate("createdBy", "username fullName profilePicture")
      .populate("instruments.playedBy", "username fullName")
      .sort({ createdAt: -1 });
    const enrichedFavorites = favoriteEvents.map((event) => {
      const eventObj = event.toObject();
      return {
        ...eventObj,
        dateAdded: event.createdAt,
        isPastEvent: new Date(event.scheduledTo) < new Date(),
      };
    });
    res.json({
      favorites: enrichedFavorites,
      count: enrichedFavorites.length,
    });
  } catch (error) {
    console.error("Get favorites error:", error);
    res.status(500).json({ error: "Failed to fetch favorite events" });
  }
};
export const likeJamEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;
    const event = await JamEvent.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    const hasLiked = event.likes.includes(userId);
    if (hasLiked) {
      event.likes = event.likes.filter((id) => !id.equals(userId));
    } else {
      event.likes.push(userId);
    }
    await event.save();
    res.json({
      message: hasLiked
        ? "Event unliked successfully"
        : "Event liked successfully",
      isLiked: !hasLiked,
      likesCount: event.likes.length,
    });
  } catch (error) {
    console.error("Like event error:", error);
    res.status(500).json({ error: "Failed to update like status" });
  }
};