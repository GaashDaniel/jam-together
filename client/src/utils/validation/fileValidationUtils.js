export const validateFileSize = (file, maxSizeMB = 5) => {
  if (!file) return false;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};
export const validateFileType = (
  file,
  allowedTypes = ["image/jpeg", "image/png", "image/gif"]
) => {
  if (!file) return false;
  return allowedTypes.includes(file.type);
};
export const validateImageFile = (file) => {
  if (!file) return { isValid: false, error: "No file provided" };
  if (!validateFileSize(file, 5)) {
    return { isValid: false, error: "File size must be less than 5MB" };
  }
  const allowedImageTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
  ];
  if (!validateFileType(file, allowedImageTypes)) {
    return {
      isValid: false,
      error: "File must be an image (JPEG, PNG, GIF, or WebP)",
    };
  }
  return { isValid: true, error: null };
};
export const validateProfilePicture = (file) => {
  const result = validateImageFile(file);
  if (!result.isValid) {
    return {
      ...result,
      error: `Profile picture validation failed: ${result.error}`,
    };
  }
  return result;
};
export const validateDocumentFile = (file, maxSizeMB = 10) => {
  if (!file) return { isValid: false, error: "No file provided" };
  if (!validateFileSize(file, maxSizeMB)) {
    return {
      isValid: false,
      error: `File size must be less than ${maxSizeMB}MB`,
    };
  }
  const allowedDocTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];
  if (!validateFileType(file, allowedDocTypes)) {
    return {
      isValid: false,
      error: "File must be a document (PDF, DOC, DOCX, or TXT)",
    };
  }
  return { isValid: true, error: null };
};