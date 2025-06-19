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
const createValidationMiddleware2 = (schema, options = {}) => {
  const {
    source = "body",
    abortEarly = false,
    stripUnknown = true,
    allowUnknown = false,
  } = options;
  return (req, res, next) => {
    const dataToValidate = source === "query" ? req.query : req.body;
    const { error, value } = schema.validate(dataToValidate, {
      abortEarly,
      stripUnknown,
      allowUnknown,
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
export const validateBody = (schema) =>
  createValidationMiddleware(schema, "body");
export const validateQuery = (schema) =>
  createValidationMiddleware(schema, "query");
const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
});
export const validatePagination = (req, res, next) => {
  const { error, value } = paginationSchema.validate(req.query, {
    allowUnknown: true,
  });
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  req.query = { ...req.query, ...value };
  next();
};