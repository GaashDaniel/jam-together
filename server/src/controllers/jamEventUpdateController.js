import JamEvent from "../models/JamEvent.js";
import JoinRequest from "../models/JoinRequest.js";
import { isValidObjectId } from "mongoose";
import {
  INSTRUMENT_NAMES,
  normalizeInstrumentName,
} from "../constants/instruments.js";
const getValidInstrumentNames = () => {
  return INSTRUMENT_NAMES.map((name) => name.toLowerCase());
};
const validateInstruments = (instruments) => {
  const validNames = getValidInstrumentNames();
  const errors = [];
  instruments.forEach((instrument, index) => {
    if (!instrument.instrument || typeof instrument.instrument !== "string") {
      errors.push(`Instrument ${index + 1}: Name is required`);
    } else if (!validNames.includes(instrument.instrument.toLowerCase())) {
      errors.push(
        `Instrument ${index + 1}: "${instrument.instrument}" is not a valid instrument`
      );
    }
  });
  return errors;
};
export const updateJamEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const updates = req.body;
    if (!isValidObjectId(eventId)) {
      return res.status(400).json({ error: "Invalid event ID" });
    }
    const event = await JamEvent.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "Not authorized to update this event" });
    }
    if (updates.scheduledTo && new Date(updates.scheduledTo) <= new Date()) {
      return res
        .status(400)
        .json({ error: "Event date must be in the future" });
    }
    if (updates.instruments) {
      const instrumentErrors = validateInstruments(updates.instruments);
      if (instrumentErrors.length > 0) {
        return res.status(400).json({
          error: "Invalid instruments",
          details: instrumentErrors,
        });
      }
      const instrumentsProcessed = updates.instruments.map((instrument) => {
        const normalizedName = normalizeInstrumentName(instrument.instrument);
        return {
          instrument: normalizedName,
          playedBy: instrument.playedBy || null,
          requestId: instrument.requestId || null,
        };
      });
      updates.instruments = instrumentsProcessed;
    }
    const updatedEvent = await JamEvent.findByIdAndUpdate(
      eventId,
      { ...updates, editedAt: new Date() },
      { new: true, runValidators: true }
    )
      .populate("createdBy", "username profilePicture")
      .populate("instruments.playedBy", "username profilePicture");
    const requests = await JoinRequest.find({ jamEvent: eventId }).populate(
      "requester",
      "username fullName profilePicture"
    );
    const eventObj = updatedEvent.toObject();
    eventObj.requests = requests;
    res.json({
      message: "Event updated successfully",
      jamEvent: eventObj,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        error: "Validation failed",
        details: errors,
      });
    }
    res.status(500).json({ error: "Failed to update event" });
  }
};
export const approveJoinRequest = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { requestId, approved } = req.body;
    if (!isValidObjectId(eventId) || !isValidObjectId(requestId)) {
      return res.status(400).json({ error: "Invalid event or request ID" });
    }
    const event = await JamEvent.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "Not authorized to approve requests for this event" });
    }
    const joinRequest = await JoinRequest.findById(requestId);
    if (!joinRequest || joinRequest.jamEvent.toString() !== eventId) {
      return res.status(404).json({ error: "Join request not found" });
    }
    if (joinRequest.approvalStatus !== null) {
      return res
        .status(400)
        .json({ error: "Request has already been processed" });
    }
    joinRequest.approvalStatus = approved;
    joinRequest.editedAt = new Date();
    await joinRequest.save();
    if (approved && joinRequest.instrument) {
      const instrumentIndex = event.instruments.findIndex(
        (inst) =>
          inst.instrument.toLowerCase() ===
            joinRequest.instrument.instrument.toLowerCase() && !inst.playedBy
      );
      if (instrumentIndex !== -1) {
        event.instruments[instrumentIndex].playedBy = joinRequest.requester;
        event.instruments[instrumentIndex].requestId = requestId;
        await event.save();
      }
    }
    const populatedRequest = await JoinRequest.findById(requestId)
      .populate("requester", "username")
      .populate("jamEvent", "title");
    res.json({
      message: approved ? "Join request approved" : "Join request rejected",
      request: populatedRequest,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to process join request" });
  }
};
export const deleteJamEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    if (!isValidObjectId(eventId)) {
      return res.status(400).json({ error: "Invalid event ID" });
    }
    const event = await JamEvent.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this event" });
    }
    await JoinRequest.deleteMany({ jamEvent: eventId });
    await JamEvent.findByIdAndDelete(eventId);
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
};