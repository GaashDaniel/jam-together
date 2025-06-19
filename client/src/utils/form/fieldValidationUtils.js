export const shouldShowError = (touched, error) => {
  return touched && Boolean(error);
};
export const getErrorHelperText = (touched, error) => {
  return touched && error ? error : null;
};
export const formatFieldName = (fieldName) => {
  return fieldName
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};