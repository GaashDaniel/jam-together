import { Router } from "express";
import * as jamEventController from "../controllers/jamEventController.js";
import * as joinRequestController from "../controllers/joinRequestController.js";
import * as eventLikeController from "../controllers/eventLikeController.js";
import {
  authenticate,
  optionalAuth,
  requireOwnerOrAdmin,
} from "../middleware/auth.js";
import {
  validateJamEvent,
  validateJoinRequest,
  validatePagination,
  validateEventUpdate,
  validateJoinRequestApproval,
  validateEventFilters,
  validateIdParam,
  validateRequestIdParam,
} from "../middleware/validate.js";
import JamEvent from "../models/JamEvent.js";
const router = Router();
router.get(
  "/",
  optionalAuth,
  validatePagination,
  validateEventFilters,
  jamEventController.getJamEvents
);
router.get("/favorites", authenticate, jamEventController.getUserFavorites);
router.get(
  "/:id",
  optionalAuth,
  validateIdParam,
  jamEventController.getJamEventById
);
router.post(
  "/",
  authenticate,
  validateJamEvent,
  jamEventController.createJamEvent
);
router.patch(
  "/:id",
  authenticate,
  validateIdParam,
  validateEventUpdate,
  requireOwnerOrAdmin(JamEvent),
  jamEventController.updateJamEvent
);
router.delete(
  "/:id",
  authenticate,
  validateIdParam,
  requireOwnerOrAdmin(JamEvent),
  jamEventController.deleteJamEvent
);
router.get(
  "/:id/available-instruments",
  authenticate,
  validateIdParam,
  joinRequestController.getUserAvailableInstruments
);
router.post(
  "/:id/join",
  authenticate,
  validateIdParam,
  validateJoinRequest,
  joinRequestController.createJoinRequest
);
router.patch(
  "/:id/approveJoin/:requestId",
  authenticate,
  validateIdParam,
  validateRequestIdParam,
  validateJoinRequestApproval,
  requireOwnerOrAdmin(JamEvent),
  joinRequestController.handleJoinRequest
);
router.post(
  "/:id/like",
  authenticate,
  validateIdParam,
  eventLikeController.toggleLike
);
export default router;