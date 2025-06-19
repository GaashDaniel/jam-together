import JamEvent from "../models/JamEvent.js";
import JoinRequest from "../models/JoinRequest.js";
export const getAvailableInstruments = async (req, res) => {
  try {
    const eventId = req.params.id;
    const userId = req.user._id;
    const event = await JamEvent.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    const existingRequest = await JoinRequest.findOne({
      jamEvent: eventId,
      requester: userId,
    });
    if (existingRequest) {
      return res.status(400).json({
        error: "You have already made a request for this event",
        existingRequest: existingRequest,
      });
    }
    const availableInstruments = event.instruments.filter(
      (instrument) => !instrument.playedBy
    );
    const instrumentNames = availableInstruments.map((inst) => inst.instrument);
    res.json({
      instruments: instrumentNames,
      event: {
        id: event._id,
        title: event.title,
        scheduledTo: event.scheduledTo,
      },
    });
  } catch (error) {
    console.error("Get available instruments error:", error);
    res.status(500).json({ error: "Failed to fetch available instruments" });
  }
};
export const assignInstrument = async (
  event,
  instrument,
  userId,
  requestId
) => {
  try {
    const instrumentIndex = event.instruments.findIndex(
      (inst) => inst.instrument.toLowerCase() === instrument.toLowerCase()
    );
    if (instrumentIndex === -1) {
      throw new Error("Instrument not found in event");
    }
    if (event.instruments[instrumentIndex].playedBy) {
      throw new Error("Instrument is already assigned");
    }
    event.instruments[instrumentIndex].playedBy = userId;
    event.instruments[instrumentIndex].requestId = requestId;
    return await event.save();
  } catch (error) {
    throw error;
  }
};
export const removeInstrumentAssignment = async (event, instrument) => {
  try {
    const instrumentIndex = event.instruments.findIndex(
      (inst) => inst.instrument.toLowerCase() === instrument.toLowerCase()
    );
    if (instrumentIndex === -1) {
      throw new Error("Instrument not found in event");
    }
    event.instruments[instrumentIndex].playedBy = null;
    event.instruments[instrumentIndex].requestId = null;
    return await event.save();
  } catch (error) {
    throw error;
  }
};