import Joi from "joi";
export const jamEventSchema = Joi.object({
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
  location: Joi.object({
    city: Joi.string().max(100).required(),
    country: Joi.string().max(100).required(),
    address: Joi.string().max(200).optional().allow(""),
  })
    .required()
    .messages({
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
export const joinRequestSchema = Joi.object({
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
export const eventUpdateSchema = Joi.object({
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
  location: Joi.object({
    city: Joi.string().max(100).required(),
    country: Joi.string().max(100).required(),
    address: Joi.string().max(200).optional().allow(""),
  }).optional(),
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
export const joinRequestApprovalSchema = Joi.object({
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