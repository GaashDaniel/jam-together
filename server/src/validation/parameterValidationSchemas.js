import Joi from "joi";
export const objectIdSchema = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .required()
  .messages({
    "string.pattern.base": "Invalid ID format",
    "any.required": "ID is required",
  });
export const idParamSchema = Joi.object({
  id: objectIdSchema,
});
export const usernameParamSchema = Joi.object({
  username: Joi.string().trim().min(3).max(30).required().messages({
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username must not exceed 30 characters",
    "any.required": "Username is required",
  }),
});
export const userIdParamSchema = Joi.object({
  userId: objectIdSchema,
});
export const eventIdParamSchema = Joi.object({
  eventId: objectIdSchema,
});
export const requestIdParamSchema = Joi.object({
  requestId: objectIdSchema,
});