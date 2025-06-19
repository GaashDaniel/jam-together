import Joi from "joi";
const createValidationMiddleware = (schema, source = "body") => {
  return (req, res, next) => {
    const dataToValidate = source === "query" ? req.query : req.body;
    const { error, value } = schema.validate(dataToValidate, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: source === "query",
    });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({
        error: errors.length === 1 ? errors[0] : errors.join(". "),
        details: errors,
      });
    }
    if (source === "query") {
      req.query = { ...req.query, ...value };
    } else {
      req.body = value;
    }
    next();
  };
};
const createParamValidationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.params, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({
        error: errors.length === 1 ? errors[0] : errors.join(". "),
        details: errors,
      });
    }
    req.params = { ...req.params, ...value };
    next();
  };
};
const createQueryValidationMiddleware = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.query, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true,
    });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(400).json({
        error: errors.length === 1 ? errors[0] : errors.join(". "),
        details: errors,
      });
    }
    req.query = { ...req.query, ...value };
    next();
  };
};
const objectIdSchema = Joi.string()
  .pattern(/^[0-9a-fA-F]{24}$/)
  .messages({
    "string.pattern.base": "Invalid ID format",
  });
const instrumentSchema = Joi.object({
  instrument: Joi.string().trim().min(1).max(50).required().messages({
    "string.empty": "Instrument name is required",
    "string.min": "Instrument name must be at least 1 character",
    "string.max": "Instrument name must not exceed 50 characters",
    "any.required": "Instrument name is required",
  }),
  experienceInYears: Joi.number()
    .integer()
    .min(0)
    .max(100)
    .required()
    .messages({
      "number.base": "Experience in years must be a number",
      "number.integer": "Experience in years must be a whole number",
      "number.min": "Experience in years must be 0 or greater",
      "number.max": "Experience in years must not exceed 100",
      "any.required": "Experience in years is required",
    }),
});
const locationSchema = Joi.object({
  city: Joi.string().max(100).required(),
  country: Joi.string().max(100).required(),
  address: Joi.string().max(200).optional().allow(""),
});
const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    "number.base": "Page must be a number",
    "number.integer": "Page must be a whole number",
    "number.min": "Page must be 1 or greater",
  }),
  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    "number.base": "Limit must be a number",
    "number.integer": "Limit must be a whole number",
    "number.min": "Limit must be 1 or greater",
    "number.max": "Limit must not exceed 100",
  }),
});
const registrationSchema = Joi.object({
  username: Joi.string().trim().min(3).max(30).required().messages({
    "string.empty": "Username is required",
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username must not exceed 30 characters",
    "any.required": "Username is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .min(8)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
    )
    .required()
    .messages({
      "string.empty": "Password is required",
      "string.min": "Password must be at least 8 characters",
      "string.pattern.base":
        "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character (!@#$%^&*)",
      "any.required": "Password is required",
    }),
  instruments: Joi.array().items(instrumentSchema).min(1).required().messages({
    "array.min": "Please add at least one instrument",
    "any.required": "Instruments are required",
  }),
  dateOfBirth: Joi.date().iso().max("now").optional().messages({
    "date.base": "Date of birth must be a valid date",
    "date.format": "Date of birth must be in ISO format",
    "date.max": "Date of birth must be in the past",
  }),
  bio: Joi.string().max(500).optional().allow("").messages({
    "string.max": "Bio must not exceed 500 characters",
  }),
  location: Joi.object({
    city: Joi.string().max(100).optional().allow(""),
    country: Joi.string().max(100).optional().allow(""),
  }).optional(),
});
const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Username is required",
    "any.required": "Username is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});
const jamEventSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title must not exceed 100 characters",
    "any.required": "Title is required",
  }),
  content: Joi.string().max(1000).optional().allow("").messages({
    "string.max": "Content must not exceed 1000 characters",
  }),
  scheduledTo: Joi.date().iso().greater("now").required().messages({
    "date.base": "Scheduled date must be a valid date",
    "date.format": "Scheduled date must be in ISO format",
    "date.greater": "Event date must be in the future",
    "any.required": "Scheduled date is required",
  }),
  location: locationSchema.required().messages({
    "any.required": "Location is required",
  }),
  genres: Joi.array().items(Joi.string().max(50)).max(10).optional().messages({
    "array.max": "Maximum 10 genres allowed",
  }),
  instruments: Joi.array()
    .items(
      Joi.object({
        instrument: Joi.string().trim().min(1).max(50).required(),
        playedBy: Joi.string().optional().allow(null),
      })
    )
    .min(1)
    .required()
    .messages({
      "array.min": "At least one instrument is required",
      "any.required": "Instruments are required",
    }),
});
const eventUpdateSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100).optional().messages({
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title must not exceed 100 characters",
  }),
  content: Joi.string().max(1000).optional().allow("").messages({
    "string.max": "Content must not exceed 1000 characters",
  }),
  scheduledTo: Joi.date().iso().greater("now").optional().messages({
    "date.base": "Scheduled date must be a valid date",
    "date.format": "Scheduled date must be in ISO format",
    "date.greater": "Event date must be in the future",
  }),
  location: locationSchema.optional(),
  genres: Joi.array().items(Joi.string().max(50)).max(10).optional().messages({
    "array.max": "Maximum 10 genres allowed",
  }),
  instruments: Joi.array()
    .items(
      Joi.object({
        instrument: Joi.string().trim().min(1).max(50).required(),
        playedBy: Joi.string().optional().allow(null),
      })
    )
    .min(1)
    .optional()
    .messages({
      "array.min": "At least one instrument is required",
    }),
});
const eventFilterSchema = Joi.object({
  search: Joi.string().trim().max(100).optional().allow("").messages({
    "string.max": "Search term must not exceed 100 characters",
  }),
  genre: Joi.string().trim().max(50).optional().allow("").messages({
    "string.max": "Genre must not exceed 50 characters",
  }),
  location: Joi.string().trim().max(100).optional().allow("").messages({
    "string.max": "Location must not exceed 100 characters",
  }),
  startDate: Joi.date().iso().optional().messages({
    "date.base": "Start date must be a valid date",
    "date.format": "Start date must be in ISO format",
  }),
  endDate: Joi.date().iso().optional().messages({
    "date.base": "End date must be a valid date",
    "date.format": "End date must be in ISO format",
  }),
  instruments: Joi.alternatives()
    .try(
      Joi.string().trim().max(50),
      Joi.array().items(Joi.string().trim().max(50)).max(10)
    )
    .optional()
    .messages({
      "string.max": "Instrument must not exceed 50 characters",
      "array.max": "Maximum 10 instruments allowed",
    }),
  sortBy: Joi.string()
    .valid("scheduledTo", "createdAt", "title")
    .optional()
    .default("scheduledTo"),
  sortOrder: Joi.string().valid("asc", "desc").optional().default("asc"),
});
const joinRequestSchema = Joi.object({
  instrument: Joi.object({
    instrument: Joi.string().trim().min(1).max(50).required().messages({
      "string.empty": "Instrument name is required for a join request",
      "any.required": "Instrument name is required for a join request",
    }),
    experienceInYears: Joi.number()
      .integer()
      .min(0)
      .max(100)
      .optional()
      .default(0),
  }).required(),
  content: Joi.string().max(500).optional().allow("").messages({
    "string.max": "Request message must not exceed 500 characters",
  }),
});
const joinRequestApprovalSchema = Joi.object({
  action: Joi.string()
    .valid("approve", "reject", "pending")
    .required()
    .messages({
      "any.only": 'Action must be either "approve", "reject", or "pending"',
      "any.required": "Action is required",
    }),
  message: Joi.string().max(500).optional().allow("").messages({
    "string.max": "Message must not exceed 500 characters",
  }),
});
const profileUpdateSchema = Joi.object({
  fullName: Joi.string().trim().max(100).optional().allow("").messages({
    "string.max": "Full name must not exceed 100 characters",
  }),
  bio: Joi.string().max(500).optional().allow("").messages({
    "string.max": "Bio must not exceed 500 characters",
  }),
  country: Joi.string().trim().max(100).optional().allow("").messages({
    "string.max": "Country must not exceed 100 characters",
  }),
  city: Joi.string().trim().max(100).optional().allow("").messages({
    "string.max": "City must not exceed 100 characters",
  }),
  birthDate: Joi.date().iso().max("now").optional().allow(null).messages({
    "date.base": "Birth date must be a valid date",
    "date.format": "Birth date must be in ISO format",
    "date.max": "Birth date must be in the past",
  }),
  instruments: Joi.array().items(instrumentSchema).min(1).optional().messages({
    "array.min": "Please add at least one instrument",
  }),
  profilePicture: Joi.string()
    .optional()
    .allow("", null)
    .custom((value, helpers) => {
      if (!value) return value;
      if (/^https?:\/\/.+/.test(value)) return value;
      if (/^\/uploads\/profile-pictures\/.+/.test(value)) return value;
      return helpers.error("any.invalid");
    })
    .messages({
      "any.invalid":
        "Profile picture must be a valid URL or uploaded file path",
    }),
});
const userRoleUpdateSchema = Joi.object({
  role: Joi.string().valid("user", "admin").required().messages({
    "any.only": 'Role must be either "user" or "admin"',
    "any.required": "Role is required",
  }),
});
const adminUserUpdateSchema = Joi.object({
  role: Joi.string().valid("user", "admin").optional().messages({
    "any.only": 'Role must be either "user" or "admin"',
  }),
  fullName: Joi.string().trim().max(100).optional().allow("").messages({
    "string.max": "Full name must not exceed 100 characters",
  }),
  bio: Joi.string().max(500).optional().allow("").messages({
    "string.max": "Bio must not exceed 500 characters",
  }),
  country: Joi.string().trim().max(100).optional().allow("").messages({
    "string.max": "Country must not exceed 100 characters",
  }),
  city: Joi.string().trim().max(100).optional().allow("").messages({
    "string.max": "City must not exceed 100 characters",
  }),
});
const userFilterSchema = Joi.object({
  search: Joi.string().trim().max(100).optional().allow("").messages({
    "string.max": "Search term must not exceed 100 characters",
  }),
  role: Joi.string().valid("user", "admin", "all").optional().default("all"),
  status: Joi.string()
    .valid("active", "inactive", "all")
    .optional()
    .default("all"),
  sortBy: Joi.string()
    .valid("createdAt", "username", "email", "fullName")
    .optional()
    .default("createdAt"),
  sortOrder: Joi.string().valid("asc", "desc").optional().default("desc"),
});
const idParamSchema = Joi.object({
  id: objectIdSchema.required(),
});
const usernameParamSchema = Joi.object({
  username: Joi.string().trim().min(3).max(30).required().messages({
    "string.min": "Username must be at least 3 characters",
    "string.max": "Username must not exceed 30 characters",
    "any.required": "Username is required",
  }),
});
const requestIdParamSchema = Joi.object({
  requestId: objectIdSchema.required(),
});
export const validatePagination = (req, res, next) => {
  const { error, value } = paginationSchema.validate(req.query, {
    stripUnknown: true,
    allowUnknown: true,
  });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).json({
      error: errors.length === 1 ? errors[0] : errors.join(". "),
      details: errors,
    });
  }
  req.pagination = {
    page: value.page,
    limit: value.limit,
    skip: (value.page - 1) * value.limit,
  };
  next();
};
export const validateRegistration =
  createValidationMiddleware(registrationSchema);
export const validateLogin = createValidationMiddleware(loginSchema);
export const validateJamEvent = createValidationMiddleware(jamEventSchema);
export const validateEventUpdate =
  createValidationMiddleware(eventUpdateSchema);
export const validateEventFilters =
  createQueryValidationMiddleware(eventFilterSchema);
export const validateJoinRequest =
  createValidationMiddleware(joinRequestSchema);
export const validateJoinRequestApproval = createValidationMiddleware(
  joinRequestApprovalSchema
);
export const validateProfileUpdate =
  createValidationMiddleware(profileUpdateSchema);
export const validateUserRoleUpdate =
  createValidationMiddleware(userRoleUpdateSchema);
export const validateAdminUserUpdate = createValidationMiddleware(
  adminUserUpdateSchema
);
export const validateUserFilters =
  createQueryValidationMiddleware(userFilterSchema);
export const validateIdParam = createParamValidationMiddleware(idParamSchema);
export const validateUsernameParam =
  createParamValidationMiddleware(usernameParamSchema);
export const validateRequestIdParam =
  createParamValidationMiddleware(requestIdParamSchema);
export const schemas = {
  registration: registrationSchema,
  login: loginSchema,
  jamEvent: jamEventSchema,
  joinRequest: joinRequestSchema,
  pagination: paginationSchema,
  instrument: instrumentSchema,
  location: locationSchema,
  profileUpdate: profileUpdateSchema,
  eventFilter: eventFilterSchema,
  userFilter: userFilterSchema,
};