export const sanitizeSql = (input) => {
  if (typeof input !== "string") return input;
  const sqlPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|UNION|SCRIPT)\b)/gi,
    /(\b(OR|AND)\b.*\b(SELECT|INSERT|UPDATE|DELETE)\b)/gi,
    /(--|#|\/\*|\*\/)/g,
    /('|('')|"|("")|(;))/g,
  ];
  let sanitized = input;
  sqlPatterns.forEach((pattern) => {
    sanitized = sanitized.replace(pattern, "");
  });
  return sanitized.trim();
};
export const sanitizeNoSql = (input) => {
  if (typeof input === "object" && input !== null) {
    const cleaned = { ...input };
    Object.keys(cleaned).forEach((key) => {
      if (key.startsWith("$") || key.includes(".")) {
        delete cleaned[key];
      }
    });
    return cleaned;
  }
  return input;
};
export const hasSqlInjectionPatterns = (input) => {
  if (typeof input !== "string") return false;
  const dangerousPatterns = [
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER)\b)/gi,
    /(UNION\s+SELECT)/gi,
    /(;\s*(SELECT|INSERT|UPDATE|DELETE))/gi,
    /(--|\#|\/\*)/g,
    /(\bOR\b.*\b(SELECT|INSERT|UPDATE|DELETE)\b)/gi,
    /(\bAND\b.*\b(SELECT|INSERT|UPDATE|DELETE)\b)/gi,
  ];
  return dangerousPatterns.some((pattern) => pattern.test(input));
};
export const sanitizeQueryParams = (params) => {
  if (Array.isArray(params)) {
    return params.map((param) => sanitizeQueryParams(param));
  }
  if (typeof params === "object" && params !== null) {
    const sanitized = {};
    Object.keys(params).forEach((key) => {
      const sanitizedKey = sanitizeSql(key);
      if (sanitizedKey) {
        sanitized[sanitizedKey] = sanitizeQueryParams(params[key]);
      }
    });
    return sanitized;
  }
  if (typeof params === "string") {
    return sanitizeSql(params);
  }
  return params;
};
export default {
  sanitizeSql,
  sanitizeNoSql,
  hasSqlInjectionPatterns,
  sanitizeQueryParams,
};