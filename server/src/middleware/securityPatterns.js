export const SUSPICIOUS_PATTERNS = {
  sqlInjection:
    /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER)\b)|(\b(UNION|OR|AND)\b.*\b(SELECT|INSERT|UPDATE|DELETE)\b)/i,
  xssAttempt: /<script|javascript:|on\w+\s*=|<iframe|<object|<embed/i,
  pathTraversal: /\.\.\//,
  commandInjection:
    /;\s*(rm|ls|cat|echo|wget|curl|nc|bash|sh|cmd|powershell)\b|`[^`]*`|\$\([^)]*\)|&&\s*\w+|>\s*\/dev\/null|>\s*\/tmp/i,
};
export const extractRequestData = (req) => {
  const parts = [];
  if (req.body && Object.keys(req.body).length > 0) {
    const bodyValues = Object.values(req.body)
      .filter((v) => typeof v === "string")
      .join(" ");
    if (bodyValues.trim()) {
      parts.push(`INPUT:${bodyValues}`);
    }
  }
  if (req.query && Object.keys(req.query).length > 0) {
    const queryValues = Object.values(req.query)
      .filter((v) => typeof v === "string")
      .join(" ");
    if (queryValues.trim()) {
      parts.push(`PARAMS:${queryValues}`);
    }
  }
  if (req.url) {
    const urlPath = req.url.split("?")[0];
    parts.push(`PATH:${urlPath}`);
  }
  return parts.join(" | ");
};
export const detectSuspiciousPatterns = (req) => {
  const requestData = extractRequestData(req);
  const detectedPatterns = [];
  for (const [patternType, pattern] of Object.entries(SUSPICIOUS_PATTERNS)) {
    if (pattern.test(requestData)) {
      detectedPatterns.push(patternType);
    }
  }
  return detectedPatterns;
};
export const logSuspiciousActivity = (req, detectedPatterns) => {
  if (detectedPatterns.length === 0) return;
  const requestData = extractRequestData(req);
  detectedPatterns.forEach((patternType) => {
    console.warn(`Suspicious ${patternType} attempt detected:`, {
      ip: req.ip,
      endpoint: req.path,
      method: req.method,
      userAgent: req.get("User-Agent"),
      data: requestData.substring(0, 500),
      timestamp: new Date().toISOString(),
    });
  });
};
export const checkSuspiciousPatterns = (req) => {
  const detectedPatterns = detectSuspiciousPatterns(req);
  logSuspiciousActivity(req, detectedPatterns);
  return detectedPatterns;
};
export const hasPattern = (req, patternType) => {
  if (!SUSPICIOUS_PATTERNS[patternType]) {
    console.warn(`Unknown pattern type: ${patternType}`);
    return false;
  }
  const requestData = extractRequestData(req);
  return SUSPICIOUS_PATTERNS[patternType].test(requestData);
};
