import express from "express";
import {
  login,
  logout,
  getMe,
  register,
  updateProfile,
} from "../controllers/authController.js";
import { authenticate } from "../middleware/auth.js";
import { validateBody } from "../validation/validationMiddleware.js";
import {
  registerSchema,
  loginSchema,
  profileUpdateSchema,
} from "../validation/userValidationSchemas.js";
const router = express.Router();
router.post("/register", validateBody(registerSchema), register);
router.post("/login", validateBody(loginSchema), login);
router.post("/logout", authenticate, logout);
router.get("/me", authenticate, getMe);
router.put(
  "/me",
  authenticate,
  validateBody(profileUpdateSchema),
  updateProfile
);
export default router;