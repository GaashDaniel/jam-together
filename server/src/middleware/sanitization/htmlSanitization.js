export const sanitizeHtml = (input) => {
  if (typeof input !== "string") return input;

  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi, "")
    .replace(/<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/on\w+\s*=/gi, "")
    .trim();
};

export const removeDangerousAttributes = (input) => {
  if (typeof input !== "string") return input;

  return input
    .replace(/on\w+\s*=/gi, "")
    .replace(/javascript:/gi, "")
    .replace(/vbscript:/gi, "")
    .replace(/data:/gi, "")
    .trim();
};

export const sanitizeHtmlFormatting = (input, options = {}) => {
  if (typeof input !== "string") return input;

  let sanitized = input;

  sanitized = sanitizeHtml(sanitized);

  if (options.removeLinks) {
    sanitized = sanitized.replace(/<a\b[^<]*(?:(?!<\/a>)<[^<]*)*<\/a>/gi, "");
  }

  if (options.removeImages) {
    sanitized = sanitized.replace(/<img\b[^<]*\/?>/gi, "");
  }

  if (options.removeStyles) {
    sanitized = sanitized.replace(/style\s*=\s*["'][^"']*["']/gi, "");
  }

  return sanitized.trim();
};

export default {
  sanitizeHtml,
  removeDangerousAttributes,
  sanitizeHtmlFormatting,
};
