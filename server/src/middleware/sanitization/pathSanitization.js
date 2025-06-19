export const sanitizePath = (input) => {
  if (typeof input !== "string") return input;
  return input
    .replace(/\.\.\//g, "")
    .replace(/\.\.\\/g, "")
    .replace(/\.\./g, "")
    .replace(/[<>:"|?*]/g, "")
    .trim();
};
export const sanitizeCommand = (input) => {
  if (typeof input !== "string") return input;
  const dangerousChars = /[;&|`$(){}[\]\\<>]/g;
  return input.replace(dangerousChars, "").trim();
};
export const sanitizeUrl = (input) => {
  if (typeof input !== "string") return input;
  try {
    const url = new URL(input);
    if (!["http:", "https:"].includes(url.protocol)) {
      return "";
    }
    return url.toString();
  } catch {
    return "";
  }
};
export const sanitizeFilename = (filename) => {
  if (typeof filename !== "string") return "";
  return filename
    .replace(/[<>:"/\\|?*]/g, "")
    .replace(/\.\./g, "")
    .replace(/^\.+/, "")
    .substring(0, 255)
    .trim();
};
export const hasDangerousPathPatterns = (path) => {
  if (typeof path !== "string") return false;
  const dangerousPatterns = [
    /\.\.\//,
    /\.\.\\/,
    /\/etc\//i,
    /\/proc\//i,
    /\/sys\//i,
    /\/dev\//i,
    /\/root\//i,
    /\/home\//i,
    /\/usr\//i,
    /\/var\//i,
    /C:\\Windows/i,
    /C:\\Program Files/i,
    /C:\\Users/i,
  ];
  return dangerousPatterns.some((pattern) => pattern.test(path));
};
export const sanitizeDirectoryPath = (dirPath) => {
  if (typeof dirPath !== "string") return "";
  return dirPath
    .replace(/\.\.\//g, "")
    .replace(/\.\.\\/g, "")
    .replace(/\/+/g, "/")
    .replace(/\\+/g, "\\")
    .replace(/[<>:"|?*]/g, "")
    .trim();
};
export default {
  sanitizePath,
  sanitizeCommand,
  sanitizeUrl,
  sanitizeFilename,
  hasDangerousPathPatterns,
  sanitizeDirectoryPath,
};
