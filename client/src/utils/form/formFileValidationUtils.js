export const validateFile = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, 
    allowedTypes = ["image/jpeg", "image/png", "image/gif"],
    required = false,
  } = options;
  if (!file) {
    return required ? "File is required" : null;
  }
  if (file.size > maxSize) {
    return `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`;
  }
  if (!allowedTypes.includes(file.type)) {
    const types = allowedTypes.map((type) => type.split("/")[1]).join(", ");
    return `File must be one of: ${types}`;
  }
  return null;
};