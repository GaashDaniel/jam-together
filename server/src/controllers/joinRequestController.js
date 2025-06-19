import JamEvent from "../models/JamEvent.js";
import JoinRequest from "../models/JoinRequest.js";
import User from "../models/User.js";
import {
  validateObjectId,
  validateInstrumentData,
  validateRequestContent,
  checkEventValidity,
  validateUserInstrument,
  checkExistingRequest,
  checkInstrumentAvailability,
} from "../utils/joinRequestValidation.js";
export const createJoinRequest = async (req, res) => {
  try {
    const { instrument: instrumentData, content } = req.body;
    const jamEventId = req.params.id;
    const validations = [
      validateObjectId(jamEventId, "event ID"),
      validateInstrumentData(instrumentData),
      validateRequestContent(content),
    ];
    for (const validation of validations) {
      if (!validation.isValid) {
        return res.status(400).json({ error: validation.error });
      }
    }
    const eventCheck = await checkEventValidity(jamEventId);
    if (!eventCheck.isValid) {
      return res.status(404).json({ error: eventCheck.error });
    }
    const userInstrumentCheck = await validateUserInstrument(
      req.user._id,
      instrumentData
    );
    if (!userInstrumentCheck.isValid) {
      return res.status(400).json({ error: userInstrumentCheck.error });
    }
    const existingRequestCheck = await checkExistingRequest(
      jamEventId,
      req.user._id
    );
    if (existingRequestCheck.hasExisting) {
      return res.status(400).json({ error: existingRequestCheck.error });
    }
    const availabilityCheck = checkInstrumentAvailability(
      eventCheck.event,
      instrumentData
    );
    if (!availabilityCheck.isAvailable) {
      return res.status(400).json({ error: availabilityCheck.error });
    }
    const joinRequest = new JoinRequest({
      jamEvent: jamEventId,
      requester: req.user._id,
      instrument: {
        instrument: instrumentData.instrument,
        experienceInYears: userInstrumentCheck.userInstrument.experienceInYears,
      },
      content: content || "",
    });
    const validationError = joinRequest.validateSync();
    if (validationError) {
      const firstError = Object.values(validationError.errors)[0];
      return res.status(400).json({ error: firstError.message });
    }
    await joinRequest.save();
    await joinRequest.populate("requester", "username fullName profilePicture");
    res.status(201).json({
      message: "Join request submitted",
      request: joinRequest,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const firstError = Object.values(error.errors)[0];
      return res.status(400).json({ error: firstError.message });
    }
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    res.status(500).json({ error: "Join request creation failed" });
  }
};
export const handleJoinRequest = async (req, res) => {
  try {
    const { id: eventId, requestId: reqId } = req.params;
    const { action } = req.body;
    let approve = null;
    if (action === "approve") approve = true;
    else if (action === "reject") approve = false;
    else if (action === "pending") approve = null;
    else {
      return res.status(400).json({
        error: "Invalid action. Must be approve, reject, or pending",
      });
    }
    const eventIdValidation = validateObjectId(eventId, "event ID");
    const requestIdValidation = validateObjectId(reqId, "request ID");
    if (!eventIdValidation.isValid) {
      return res.status(400).json({ error: eventIdValidation.error });
    }
    if (!requestIdValidation.isValid) {
      return res.status(400).json({ error: requestIdValidation.error });
    }
    const [joinRequest, event] = await Promise.all([
      JoinRequest.findById(reqId),
      JamEvent.findById(eventId),
    ]);
    if (!joinRequest) {
      return res.status(404).json({ error: "Request not found" });
    }
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    if (joinRequest.jamEvent.toString() !== eventId) {
      return res
        .status(400)
        .json({ error: "Request does not belong to this event" });
    }
    if (event.scheduledTo <= new Date()) {
      return res.status(400).json({
        error:
          "Cannot modify requests for events that have already started or passed",
      });
    }
    if (event.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        error: "Only the event creator can approve/reject requests",
      });
    }
    if (approve) {
      const instrumentSlot = event.instruments.find(
        (i) =>
          i.instrument.toLowerCase() ===
            joinRequest.instrument.instrument.toLowerCase() && !i.playedBy
      );
      if (!instrumentSlot) {
        return res
          .status(400)
          .json({ error: "Instrument is no longer available" });
      }
    }
    if (joinRequest.approvalStatus === true && approve !== true) {
      await event.removeAssignment(joinRequest.instrument.instrument);
    }
    joinRequest.approvalStatus = approve;
    const validationError = joinRequest.validateSync();
    if (validationError) {
      const firstError = Object.values(validationError.errors)[0];
      return res.status(400).json({ error: firstError.message });
    }
    await joinRequest.save();
    if (approve === true) {
      await event.assignInstrument(
        joinRequest.instrument.instrument,
        joinRequest.requester,
        joinRequest._id
      );
    }
    const message =
      approve === true
        ? "Request approved"
        : approve === false
          ? "Request rejected"
          : "Request set to pending";
    res.json({ message, request: joinRequest });
  } catch (error) {
    if (error.name === "ValidationError") {
      const firstError = Object.values(error.errors)[0];
      return res.status(400).json({ error: firstError.message });
    }
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    res.status(500).json({ error: "Request handling failed" });
  }
};
export const getUserAvailableInstruments = async (req, res) => {
  const { id: eventId } = req.params;
  try {
    const [user, event] = await Promise.all([
      User.findById(req.user._id).select("instruments"),
      JamEvent.findById(eventId).select("instruments"),
    ]);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    const availableInstruments = user.instruments.filter((userInst) => {
      return event.instruments.some(
        (eventInst) =>
          eventInst.instrument.toLowerCase() ===
            userInst.instrument.toLowerCase() && !eventInst.playedBy
      );
    });
    res.json({ instruments: availableInstruments });
  } catch (error) {
    res.status(500).json({ error: "Failed to get available instruments" });
  }
};