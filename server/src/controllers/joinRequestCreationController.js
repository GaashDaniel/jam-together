import JamEvent from "../models/JamEvent.js";
import JoinRequest from "../models/JoinRequest.js";
import User from "../models/User.js";
export const createJoinRequest = async (req, res) => {
  try {
    const { instrument: instrumentData, content } = req.body;
    const jamEventId = req.params.id;
    if (!jamEventId || !jamEventId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Invalid event ID format" });
    }
    if (!instrumentData || typeof instrumentData !== "object") {
      return res.status(400).json({ error: "Instrument data is required" });
    }
    if (
      !instrumentData.instrument ||
      typeof instrumentData.instrument !== "string"
    ) {
      return res.status(400).json({ error: "Instrument name is required" });
    }
    if (content && (typeof content !== "string" || content.length > 1000)) {
      return res
        .status(400)
        .json({ error: "Content cannot exceed 1000 characters" });
    }
    const event = await JamEvent.findById(jamEventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    if (event.scheduledTo <= new Date()) {
      return res.status(400).json({
        error: "Cannot join events that have already started or passed",
      });
    }
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userInstrument = user.instruments.find(
      (inst) =>
        inst.instrument.toLowerCase() ===
        instrumentData.instrument.toLowerCase()
    );
    if (!userInstrument) {
      return res.status(400).json({
        error: `You don't have ${instrumentData.instrument} in your profile. You can only apply for instruments you play.`,
      });
    }
    const existingRequest = await JoinRequest.findOne({
      jamEvent: jamEventId,
      requester: req.user._id,
    });
    if (existingRequest) {
      return res
        .status(400)
        .json({ error: "You already have a pending request" });
    }
    const instrumentSlot = event.instruments.find(
      (i) =>
        i.instrument.toLowerCase() ===
          instrumentData.instrument.toLowerCase() && !i.playedBy
    );
    if (!instrumentSlot) {
      return res.status(400).json({ error: "Instrument not available" });
    }
    const joinRequest = new JoinRequest({
      jamEvent: jamEventId,
      requester: req.user._id,
      instrument: {
        instrument: instrumentData.instrument,
        experienceInYears: userInstrument.experienceInYears,
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