import JamEvent from "../models/JamEvent.js";
import User from "../models/User.js";
import JoinRequest from "../models/JoinRequest.js";
export const validateJoinRequestData = (instrumentData, content) => {
  if (!instrumentData || typeof instrumentData !== "object") {
    return { isValid: false, error: "Instrument data is required" };
  }
  if (
    !instrumentData.instrument ||
    typeof instrumentData.instrument !== "string"
  ) {
    return { isValid: false, error: "Instrument name is required" };
  }
  if (content && (typeof content !== "string" || content.length > 1000)) {
    return { isValid: false, error: "Content cannot exceed 1000 characters" };
  }
  return { isValid: true };
};
export const validateEventId = (eventId) => {
  if (!eventId || !eventId.match(/^[0-9a-fA-F]{24}$/)) {
    return { isValid: false, error: "Invalid event ID format" };
  }
  return { isValid: true };
};
export const validateRequestId = (requestId) => {
  if (!requestId || !requestId.match(/^[0-9a-fA-F]{24}$/)) {
    return { isValid: false, error: "Invalid request ID format" };
  }
  return { isValid: true };
};
export const validateEventForJoining = async (eventId) => {
  const event = await JamEvent.findById(eventId);
  if (!event) {
    return { isValid: false, error: "Event not found" };
  }
  if (event.scheduledTo <= new Date()) {
    return {
      isValid: false,
      error: "Cannot join events that have already started or passed",
    };
  }
  return { isValid: true, event };
};
export const validateUserInstrument = async (userId, instrumentData) => {
  const user = await User.findById(userId);
  if (!user) {
    return { isValid: false, error: "User not found" };
  }
  const userInstrument = user.instruments.find(
    (inst) =>
      inst.instrument.toLowerCase() === instrumentData.instrument.toLowerCase()
  );
  if (!userInstrument) {
    return {
      isValid: false,
      error: `You don't have ${instrumentData.instrument} in your profile. You can only apply for instruments you play.`,
    };
  }
  return { isValid: true, user, userInstrument };
};
export const checkExistingRequest = async (jamEventId, userId) => {
  const existingRequest = await JoinRequest.findOne({
    jamEvent: jamEventId,
    requester: userId,
  });
  if (existingRequest) {
    return { hasExisting: true, error: "You already have a pending request" };
  }
  return { hasExisting: false };
};
export const checkInstrumentAvailability = (event, instrumentData) => {
  const instrumentSlot = event.instruments.find(
    (i) =>
      i.instrument.toLowerCase() === instrumentData.instrument.toLowerCase() &&
      !i.playedBy
  );
  if (!instrumentSlot) {
    return { isAvailable: false, error: "Instrument not available" };
  }
  return { isAvailable: true };
};