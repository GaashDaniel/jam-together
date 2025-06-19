import { Router } from "express";
import * as analyticsController from "../controllers/analyticsController.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";
const router = Router();
router.get("/", authenticate, requireAdmin, analyticsController.getAnalytics);
export default router;