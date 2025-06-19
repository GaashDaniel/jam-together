import {
  hasFormErrors,
  hasRequiredFields,
  touchAllFields,
  getFirstError,
} from "./formStateUtils.js";
import { formatFieldName } from "./fieldValidationUtils.js";
const validateFormBeforeSubmit = (
  values,
  errors,
  requiredFields,
  showToast
) => {
  if (hasFormErrors(errors)) {
    const firstError = getFirstError(errors);
    if (showToast && firstError) {
      showToast(`Please fix the following error: ${firstError}`, "error");
    }
    return false;
  }
  if (!hasRequiredFields(values, requiredFields)) {
    const missingFields = requiredFields.filter((field) => {
      const value = values[field];
      if (Array.isArray(value)) return value.length === 0;
      return value === null || value === undefined || value === "";
    });
    if (showToast && missingFields.length > 0) {
      const fieldNames = missingFields.map(formatFieldName).join(", ");
      showToast(
        `Please fill in the following required fields: ${fieldNames}`,
        "error"
      );
    }
    return false;
  }
  return true;
};
export const createSecureSubmitHandler = (
  onSubmit,
  formState,
  requiredFields = [],
  showToast
) => {
  return async (event) => {
    if (event) {
      event.preventDefault();
    }
    const { values, errors, isSubmitting, setTouched } = formState;
    if (isSubmitting) return;
    if (setTouched) {
      setTouched(touchAllFields(values));
    }
    if (!validateFormBeforeSubmit(values, errors, requiredFields, showToast)) {
      return;
    }
    try {
      await onSubmit(values, formState);
    } catch (error) {
      if (showToast) {
        showToast(
          error.message || "An error occurred while submitting the form",
          "error"
        );
      }
    }
  };
};