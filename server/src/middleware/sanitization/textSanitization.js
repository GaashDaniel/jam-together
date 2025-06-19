export const sanitizeEmail = (input) => {
  if (typeof input !== "string") return input;
  return input
    .toLowerCase()
    .replace(/[^a-z0-9@._-]/g, "")
    .trim();
};
export const sanitizePhone = (input) => {
  if (typeof input !== "string") return input;
  return input.replace(/[^0-9+\-\s()]/g, "").trim();
};
export const sanitizeText = (input, options = {}) => {
  if (typeof input !== "string") return input;
  let sanitized = input;
  if (options.maxLength) {
    sanitized = sanitized.substring(0, options.maxLength);
  }
  if (options.removeNewlines) {
    sanitized = sanitized.replace(/[\r\n]/g, " ");
  }
  if (options.removeTabs) {
    sanitized = sanitized.replace(/\t/g, " ");
  }
  if (options.removeMultipleSpaces) {
    sanitized = sanitized.replace(/\s+/g, " ");
  }
  if (options.removeSpecialChars) {
    sanitized = sanitized.replace(/[^\w\s.-]/g, "");
  }
  if (options.alphaNumericOnly) {
    sanitized = sanitized.replace(/[^a-zA-Z0-9\s]/g, "");
  }
  return sanitized.trim();
};
export const sanitizeName = (input) => {
  if (typeof input !== "string") return input;
  return input
    .replace(/[^a-zA-Z\s'-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};
export const sanitizeUsername = (input) => {
  if (typeof input !== "string") return input;
  return input
    .toLowerCase()
    .replace(/[^a-z0-9_.-]/g, "")
    .replace(/^[._-]+|[._-]+$/g, "")
    .substring(0, 50)
    .trim();
};
export const sanitizeDescription = (input, options = {}) => {
  if (typeof input !== "string") return input;
  const maxLength = options.maxLength || 5000;
  return input
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
    .replace(/\s+/g, " ")
    .substring(0, maxLength)
    .trim();
};
export const sanitizeObjectText = (obj, options = {}) => {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) {
    return obj.map((item) => sanitizeObjectText(item, options));
  }
  if (typeof obj === "object") {
    const sanitized = {};
    Object.keys(obj).forEach((key) => {
      const sanitizedKey = sanitizeText(key, {
        maxLength: 100,
        removeSpecialChars: true,
      });
      if (sanitizedKey) {
        sanitized[sanitizedKey] = sanitizeObjectText(obj[key], options);
      }
    });
    return sanitized;
  }
  if (typeof obj === "string") {
    return sanitizeText(obj, options);
  }
  return obj;
};
export default {
  sanitizeEmail,
  sanitizePhone,
  sanitizeText,
  sanitizeName,
  sanitizeUsername,
  sanitizeDescription,
  sanitizeObjectText,
};