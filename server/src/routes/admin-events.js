import express from "express";
import JamEvent from "../models/JamEvent.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";
import {
  validatePagination,
  validateEventFilters,
  validateIdParam,
} from "../middleware/validate.js";
import Joi from "joi";
const router = express.Router();
router.use(authenticate);
router.use(requireAdmin);
const adminEventActionSchema = Joi.object({
  action: Joi.string()
    .valid("flag", "unflag", "delete", "cancel", "activate")
    .required()
    .messages({
      "any.only":
        "Action must be one of: flag, unflag, delete, cancel, activate",
      "any.required": "Action is required",
    }),
  reason: Joi.string().max(500).optional().allow("").messages({
    "string.max": "Reason must not exceed 500 characters",
  }),
});
const validateAdminEventAction = (req, res, next) => {
  const { error, value } = adminEventActionSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json({
      error: errors.length === 1 ? errors[0] : errors.join(". "),
      details: errors,
    });
  }
  req.body = value;
  next();
};
router.get("/", validatePagination, validateEventFilters, async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      status,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const filter = {};
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { "location.city": { $regex: search, $options: "i" } },
        { "location.country": { $regex: search, $options: "i" } },
      ];
    }
    if (status && status !== "all") {
      filter.status = status;
    }
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    const [events, total] = await Promise.all([
      JamEvent.find(filter)
        .populate("createdBy", "username email profilePicture")
        .sort(sort)
        .skip(skip)
        .limit(parseInt(limit))
        .lean(),
      JamEvent.countDocuments(filter),
    ]);
    res.json({
      events,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / parseInt(limit)),
        total,
        hasNext: skip + events.length < total,
        hasPrev: parseInt(page) > 1,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});
router.get("/:eventId", validateIdParam, async (req, res) => {
  try {
    const event = await JamEvent.findById(req.params.eventId)
      .populate("createdBy", "username email profilePicture")
      .populate("requests.requester", "username email profilePicture")
      .populate("likes", "username")
      .lean();
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json({ event });
  } catch (error) {
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});
router.patch(
  "/:eventId",
  validateIdParam,
  validateAdminEventAction,
  async (req, res) => {
    try {
      const { action, reason } = req.body;
      const eventId = req.params.eventId;
      const event = await JamEvent.findById(eventId);
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      switch (action) {
        case "flag":
          event.status = "flagged";
          event.flagReason = reason || "Flagged by administrator";
          event.flaggedAt = new Date();
          event.flaggedBy = req.user._id;
          break;
        case "unflag":
          event.status = "active";
          event.flagReason = undefined;
          event.flaggedAt = undefined;
          event.flaggedBy = undefined;
          break;
        case "delete":
          event.status = "deleted";
          event.deletedAt = new Date();
          event.deletedBy = req.user._id;
          break;
        case "cancel":
          event.status = "cancelled";
          event.cancelledAt = new Date();
          event.cancelledBy = req.user._id;
          event.cancelReason = reason || "Cancelled by administrator";
          break;
        case "activate":
          event.status = "active";
          break;
        default:
          return res.status(400).json({ error: "Invalid action" });
      }
      await event.save();
      res.json({
        message: `Event ${action}ed successfully`,
        event: await JamEvent.findById(eventId)
          .populate("createdBy", "username email")
          .lean(),
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: error.message || "Failed to update event" });
    }
  }
);
router.delete("/:id", validateIdParam, async (req, res) => {
  try {
    const eventId = req.params.id;
    const event = await JamEvent.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    await JamEvent.findByIdAndDelete(eventId);
    res.json({
      message: "Event permanently deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to delete event" });
  }
});
export default router;