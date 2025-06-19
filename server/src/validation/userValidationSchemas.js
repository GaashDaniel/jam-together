import Joi from "joi";
const instrumentSchema = Joi.object({
  instrument: Joi.string().required().messages({
    "string.empty": "Instrument name is required",
    "any.required": "Instrument name is required",
  }),
  family: Joi.string().optional(),
  experienceInYears: Joi.number().integer().min(0).max(99).required().messages({
    "number.base": "Experience must be a number",
    "number.integer": "Experience must be a whole number",
    "number.min": "Experience cannot be negative",
    "number.max": "Experience cannot exceed 99 years",
    "any.required": "Experience in years is required",
  }),
});
export const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.alphanum": "Username can only contain letters and numbers",
    "string.min": "Username must be at least 3 characters long",
    "string.max": "Username cannot exceed 30 characters",
    "string.empty": "Username is required",
    "any.required": "Username is required",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Please provide a valid email address",
    "string.empty": "Email is required",
    "any.required": "Email is required",
  }),
  password: Joi.string()
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/
    )
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character (!@#$%^&*)",
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
  fullName: Joi.string().min(1).max(100).optional().allow("").messages({
    "string.min": "Full name must be at least 1 character long",
    "string.max": "Full name cannot exceed 100 characters",
  }),
  instruments: Joi.array().items(instrumentSchema).min(1).required().messages({
    "array.min": "At least one instrument is required",
    "any.required": "Instruments are required",
  }),
  birthDate: Joi.date().iso().max("now").optional().allow("").messages({
    "date.format": "Birth date must be in YYYY-MM-DD format",
    "date.max": "Birth date cannot be in the future",
  }),
  country: Joi.string().max(100).optional().allow("").messages({
    "string.max": "Country cannot exceed 100 characters",
  }),
  city: Joi.string().max(100).optional().allow("").messages({
    "string.max": "City cannot exceed 100 characters",
  }),
  bio: Joi.string().max(500).optional().allow("").messages({
    "string.max": "Bio cannot exceed 500 characters",
  }),
});
export const loginSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.empty": "Username or email is required",
    "any.required": "Username or email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.required": "Password is required",
  }),
});
export const profileUpdateSchema = Joi.object({
  fullName: Joi.string().min(1).max(100).optional().allow("").messages({
    "string.min": "Full name must be at least 1 character long",
    "string.max": "Full name cannot exceed 100 characters",
  }),
  instruments: Joi.array().items(instrumentSchema).optional().messages({}),
  birthDate: Joi.date().iso().max("now").optional().allow("").messages({
    "date.format": "Birth date must be in YYYY-MM-DD format",
    "date.max": "Birth date cannot be in the future",
  }),
  country: Joi.string().max(100).optional().allow("").messages({
    "string.max": "Country cannot exceed 100 characters",
  }),
  city: Joi.string().max(100).optional().allow("").messages({
    "string.max": "City cannot exceed 100 characters",
  }),
  bio: Joi.string().max(500).optional().allow("").messages({
    "string.max": "Bio cannot exceed 500 characters",
  }),
  profilePicture: Joi.alternatives()
    .try(
      Joi.string().uri().messages({
        "string.uri": "Profile picture must be a valid URL",
      }),
      Joi.string()
        .pattern(/^\/uploads\/profile-pictures\/.*\.(jpg|jpeg|png|gif|webp)$/i)
        .messages({
          "string.pattern.base": "Invalid profile picture path",
        })
    )
    .optional()
    .allow(""),
});
export const roleUpdateSchema = Joi.object({
  role: Joi.string().valid("user", "admin").required().messages({
    "any.only": "Role must be either 'user' or 'admin'",
    "any.required": "Role is required",
  }),
});
export const adminUserUpdateSchema = Joi.object({
  fullName: Joi.string().min(1).max(100).optional().allow("").messages({
    "string.min": "Full name must be at least 1 character long",
    "string.max": "Full name cannot exceed 100 characters",
  }),
  role: Joi.string().valid("user", "admin").optional().messages({
    "any.only": "Role must be either 'user' or 'admin'",
  }),
  country: Joi.string().max(100).optional().allow("").messages({
    "string.max": "Country cannot exceed 100 characters",
  }),
  city: Joi.string().max(100).optional().allow("").messages({
    "string.max": "City cannot exceed 100 characters",
  }),
  bio: Joi.string().max(500).optional().allow("").messages({
    "string.max": "Bio cannot exceed 500 characters",
  }),
});