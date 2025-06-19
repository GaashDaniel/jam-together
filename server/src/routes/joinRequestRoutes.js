import { Router } from "express";
import JoinRequest from "../models/JoinRequest.js";
import JamEvent from "../models/JamEvent.js";
import { authenticate } from "../middleware/auth.js";
import { validateRequestIdParam } from "../middleware/validate.js";
const router = Router();
router.get("/my-requests", authenticate, async (req, res) => {
  try {
    const requests = await JoinRequest.find({ requester: req.user._id })
      .populate({
        path: "jamEvent",
        select: "title content scheduledTo location createdBy genres",
        populate: {
          path: "createdBy",
          select: "username fullName profilePicture",
        },
      })
      .sort({ createdAt: -1 });
    const transformedRequests = requests.map((request) => ({
      _id: request._id,
      status:
        request.approvalStatus === null
          ? "pending"
          : request.approvalStatus === true
            ? "approved"
            : "denied",
      requestedInstrument: request.instrument?.instrument,
      message: request.content,
      createdAt: request.createdAt,
      jamEvent: request.jamEvent,
    }));
    res.json({
      requests: transformedRequests,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch your requests" });
  }
});
router.get("/my-events-requests", authenticate, async (req, res) => {
  try {
    const userEvents = await JamEvent.find({ createdBy: req.user._id }).select(
      "_id"
    );
    const eventIds = userEvents.map((event) => event._id);
    const requests = await JoinRequest.find({ jamEvent: { $in: eventIds } })
      .populate("requester", "username fullName profilePicture")
      .populate("jamEvent", "title scheduledTo location")
      .sort({ createdAt: -1 });
    res.json({
      requests,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event requests" });
  }
});
router.delete(
  "/:requestId",
  authenticate,
  validateRequestIdParam,
  async (req, res) => {
    try {
      const { requestId } = req.params;
      const request = await JoinRequest.findById(requestId);
      if (!request) {
        return res.status(404).json({ error: "Join request not found" });
      }
      if (request.requester.toString() !== req.user._id.toString()) {
        return res
          .status(403)
          .json({ error: "You can only cancel your own requests" });
      }
      if (request.approvalStatus === true) {
        return res
          .status(400)
          .json({ error: "Cannot cancel an approved request" });
      }
      await JoinRequest.findByIdAndDelete(requestId);
      res.json({
        message: "Join request cancelled successfully",
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to cancel join request" });
    }
  }
);
export default router;