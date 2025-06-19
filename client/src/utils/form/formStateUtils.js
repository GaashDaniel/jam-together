export const hasFormErrors = (errors) => {
  return Object.keys(errors).some((key) => Boolean(errors[key]));
};
export const hasRequiredFields = (values, requiredFields) => {
  return requiredFields.every((field) => {
    const value = values[field];
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== null && value !== undefined && value !== "";
  });
};
export const canSubmitForm = (
  values,
  errors,
  requiredFields = [],
  isSubmitting = false
) => {
  if (isSubmitting) return false;
  if (hasFormErrors(errors)) return false;
  if (!hasRequiredFields(values, requiredFields)) return false;
  return true;
};
export const touchAllFields = (values) => {
  const touched = {};
  Object.keys(values).forEach((key) => {
    touched[key] = true;
  });
  return touched;
};
export const getFirstError = (errors) => {
  const errorValues = Object.values(errors).filter(Boolean);
  return errorValues.length > 0 ? errorValues[0] : null;
};