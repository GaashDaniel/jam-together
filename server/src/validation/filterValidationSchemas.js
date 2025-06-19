import Joi from "joi";
export const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    "number.base": "Page must be a number",
    "number.integer": "Page must be a whole number",
    "number.min": "Page must be at least 1",
  }),
  limit: Joi.number().integer().min(1).max(100).default(20).messages({
    "number.base": "Limit must be a number",
    "number.integer": "Limit must be a whole number",
    "number.min": "Limit must be at least 1",
    "number.max": "Limit cannot exceed 100",
  }),
});
export const eventFilterSchema = Joi.object({
  search: Joi.string().max(100).optional().allow("").messages({
    "string.max": "Search term cannot exceed 100 characters",
  }),
  city: Joi.string().max(50).optional().allow("").messages({
    "string.max": "City cannot exceed 50 characters",
  }),
  country: Joi.string().max(50).optional().allow("").messages({
    "string.max": "Country cannot exceed 50 characters",
  }),
  genres: Joi.alternatives()
    .try(Joi.string().max(50), Joi.array().items(Joi.string().max(50)))
    .optional()
    .messages({
      "string.max": "Genre cannot exceed 50 characters",
    }),
  instruments: Joi.alternatives()
    .try(Joi.string().max(50), Joi.array().items(Joi.string().max(50)))
    .optional()
    .messages({
      "string.max": "Instrument cannot exceed 50 characters",
    }),
  dateFrom: Joi.date().iso().optional().messages({
    "date.format": "Date from must be in ISO format",
  }),
  dateTo: Joi.date().iso().min(Joi.ref("dateFrom")).optional().messages({
    "date.format": "Date to must be in ISO format",
    "date.min": "Date to must be after date from",
  }),
  sortBy: Joi.string()
    .valid("scheduledTo", "createdAt", "title", "likes")
    .default("scheduledTo")
    .messages({
      "any.only":
        "Sort by must be one of: scheduledTo, createdAt, title, likes",
    }),
  sortOrder: Joi.string().valid("asc", "desc").default("asc").messages({
    "any.only": "Sort order must be either 'asc' or 'desc'",
  }),
}).concat(paginationSchema);
export const userFilterSchema = Joi.object({
  search: Joi.string().max(100).optional().allow("").messages({
    "string.max": "Search term cannot exceed 100 characters",
  }),
  role: Joi.string().valid("user", "admin", "all").default("all").messages({
    "any.only": "Role must be one of: user, admin, all",
  }),
  status: Joi.string()
    .valid("active", "inactive", "all")
    .default("all")
    .messages({
      "any.only": "Status must be one of: active, inactive, all",
    }),
  sortBy: Joi.string()
    .valid("createdAt", "username", "email", "role")
    .default("createdAt")
    .messages({
      "any.only": "Sort by must be one of: createdAt, username, email, role",
    }),
  sortOrder: Joi.string().valid("asc", "desc").default("desc").messages({
    "any.only": "Sort order must be either 'asc' or 'desc'",
  }),
}).concat(paginationSchema);