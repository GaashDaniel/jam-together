import { sanitizeHtml } from "./htmlSanitization.js";
import { sanitizeSql, sanitizeNoSql } from "./sqlSanitization.js";
import { sanitizePath, sanitizeCommand } from "./pathSanitization.js";
import { sanitizeText, sanitizeObjectText } from "./textSanitization.js";
export const sanitizeRequest = (options = {}) => {
  return (req, res, next) => {
    try {
      if (req.body) {
        req.body = sanitizeObjectText(req.body, options);
      }
      if (req.query) {
        req.query = sanitizeObjectText(req.query, options);
      }
      if (req.params) {
        req.params = sanitizeObjectText(req.params, options);
      }
      next();
    } catch (error) {
      return next();
    }
  };
};
export const sanitizeUserInput = sanitizeRequest({
  html: true,
  sql: true,
  command: true,
  maxLength: 10000,
});
export const sanitizeAdminInput = sanitizeRequest({
  html: true,
  sql: true,
  command: true,
  maxLength: 50000,
});
export const sanitizeSearchInput = sanitizeRequest({
  html: true,
  sql: true,
  command: true,
  maxLength: 500,
});
export const sanitizeFileInput = (req, res, next) => {
  if (req.file) {
    req.file.originalname = sanitizePath(req.file.originalname);
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedMimeTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        error: "Invalid file type",
        message: "Only image files are allowed.",
      });
    }
    const maxSize = 5 * 1024 * 1024;
    if (req.file.size > maxSize) {
      return res.status(400).json({
        error: "File too large",
        message: "File size must be less than 5MB.",
      });
    }
  }
  next();
};
export const validateContentType = (req, res, next) => {
  const contentType = req.get("Content-Type");
  if (req.method === "POST" || req.method === "PUT" || req.method === "PATCH") {
    if (!contentType) {
      return res.status(400).json({
        error: "Missing Content-Type",
        message: "Content-Type header is required for this request.",
      });
    }
    const allowedTypes = [
      "application/json",
      "application/x-www-form-urlencoded",
      "multipart/form-data",
    ];
    const isAllowed = allowedTypes.some((type) => contentType.includes(type));
    if (!isAllowed) {
      return res.status(415).json({
        error: "Unsupported Media Type",
        message: "Content-Type not supported.",
      });
    }
  }
  next();
};
export const validateRequest = (options = {}) => {
  return (req, res, next) => {
    try {
      const maxSize = options.maxRequestSize || 10 * 1024 * 1024;
      const requestSize = parseInt(req.get("content-length") || "0");
      if (requestSize > maxSize) {
        return res.status(413).json({
          error: "Request too large",
          message: "Request size exceeds maximum allowed size.",
        });
      }
      if (options.requiredFields && req.body) {
        const missingFields = options.requiredFields.filter(
          (field) => !req.body[field]
        );
        if (missingFields.length > 0) {
          return res.status(400).json({
            error: "Missing required fields",
            message: `Required fields: ${missingFields.join(", ")}`,
          });
        }
      }
      next();
    } catch (error) {
      return next();
    }
  };
};
export default {
  sanitizeRequest,
  sanitizeUserInput,
  sanitizeAdminInput,
  sanitizeSearchInput,
  sanitizeFileInput,
  validateContentType,
  validateRequest,
};