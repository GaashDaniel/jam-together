import express from "express";
import {
  getUserByUsername,
  getCurrentUserEvents,
  getUserById,
  getUserStats,
} from "../controllers/userController.js";
import {
  updateUserRole,
  deleteUser,
} from "../controllers/userAdminController.js";
import {
  getAllUsers,
  getUserDetails,
} from "../controllers/adminUserQueriesController.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";
import {
  validateBody,
  validateQuery,
} from "../validation/validationMiddleware.js";
import {
  roleUpdateSchema,
  adminUserUpdateSchema,
} from "../validation/userValidationSchemas.js";
import { userFilterSchema } from "../validation/filterValidationSchemas.js";
import { idParamSchema } from "../validation/parameterValidationSchemas.js";
const router = express.Router();
router.get("/me/events", authenticate, getCurrentUserEvents);
router.get("/profile/:username", getUserByUsername);
router.use(authenticate, requireAdmin);
router.get("/", validateQuery(userFilterSchema), getAllUsers);
router.get("/statistics", getUserStats);
router.get("/:id", getUserById);
router.put("/:id/role", validateBody(roleUpdateSchema), updateUserRole);
router.delete("/:id", deleteUser);
export default router;