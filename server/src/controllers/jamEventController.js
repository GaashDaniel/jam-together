import JamEvent from "../models/JamEvent.js";
import JoinRequest from "../models/JoinRequest.js";
import {
  getUserFavorites,
  likeJamEvent,
} from "./jamEventFavoritesController.js";
import {
  getAvailableInstruments,
  assignInstrument,
  removeInstrumentAssignment,
} from "./jamEventInstrumentController.js";
import { updateJamEvent } from "./jamEventUpdateController.js";
import { validateJamEventData } from "./jamEventValidationController.js";
import { buildJamEventQuery } from "./jamEventQueryController.js";
export {
  getUserFavorites,
  likeJamEvent,
  getAvailableInstruments,
  updateJamEvent,
};
export const getJamEvents = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const query = buildJamEventQuery(req.query);
  const [events, total] = await Promise.all([
    JamEvent.find(query)
      .populate("createdBy", "username fullName profilePicture")
      .populate("instruments.playedBy", "username fullName")
      .sort({ scheduledTo: 1 })
      .skip(skip)
      .limit(parseInt(limit)),
    JamEvent.countDocuments(query),
  ]);
  const eventIds = events.map((e) => e._id);
  const requestCounts = await JoinRequest.aggregate([
    { $match: { jamEvent: { $in: eventIds } } },
    { $group: { _id: "$jamEvent", count: { $sum: 1 } } },
  ]);
  const eventsWithRequestCounts = events.map((event) => {
    const eventObj = event.toObject();
    const requestCount = requestCounts.find(
      (rc) => rc._id.toString() === event._id.toString()
    );
    eventObj.requestCount = requestCount ? requestCount.count : 0;
    return eventObj;
  });
  if (req.user) {
    const userRequests = await JoinRequest.find({
      jamEvent: { $in: eventIds },
      requester: req.user._id,
    });
    eventsWithRequestCounts.forEach((event) => {
      const request = userRequests.find(
        (r) => r.jamEvent.toString() === event._id.toString()
      );
      event.myRequest = request || null;
    });
  }
  res.json({
    jamEvents: eventsWithRequestCounts,
    pagination: {
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit),
    },
  });
};
export const getJamEventById = async (req, res) => {
  const event = await JamEvent.findById(req.params.id)
    .populate("createdBy", "username fullName profilePicture bio")
    .populate("instruments.playedBy", "username fullName profilePicture");
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }
  const requests = await JoinRequest.find({ jamEvent: event._id }).populate(
    "requester",
    "username fullName profilePicture"
  );
  const eventObj = event.toObject();
  eventObj.requests = requests;
  res.json({ jamEvent: eventObj });
};
export const createJamEvent = async (req, res) => {
  try {
    const validation = validateJamEventData(req.body);
    if (!validation.isValid) {
      return res.status(400).json({ error: validation.error });
    }
    const eventData = {
      ...req.body,
      createdBy: req.user._id,
    };
    const event = new JamEvent(eventData);
    const validationError = event.validateSync();
    if (validationError) {
      const firstError = Object.values(validationError.errors)[0];
      return res.status(400).json({ error: firstError.message });
    }
    await event.save();
    await event.populate("createdBy", "username fullName profilePicture");
    res.status(201).json({
      message: "Event created successfully",
      jamEvent: event,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const firstError = Object.values(error.errors)[0];
      return res.status(400).json({ error: firstError.message });
    }
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    res.status(500).json({ error: "Event creation failed" });
  }
};
export const deleteJamEvent = async (req, res) => {
  await JamEvent.findByIdAndDelete(req.params.id);
  await JoinRequest.deleteMany({ jamEvent: req.params.id });
  res.json({
    message: "Event deleted successfully",
  });
};