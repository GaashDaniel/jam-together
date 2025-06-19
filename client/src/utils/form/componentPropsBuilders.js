import { shouldShowError, getErrorHelperText } from "./fieldValidationUtils.js";
import { canSubmitForm } from "./formStateUtils.js";
export const getValidatedTextFieldProps = (name, formState, options = {}) => {
  const { values, errors, touched, handleChange, handleBlur } = formState;
  const { required = false, ...otherOptions } = options;
  return {
    name,
    value: values[name] || "",
    onChange: handleChange,
    onBlur: handleBlur,
    error: shouldShowError(touched[name], errors[name]),
    helperText: getErrorHelperText(touched[name], errors[name]),
    required,
    ...otherOptions,
  };
};
export const getValidatedSelectProps = (name, formState, options = {}) => {
  const { values, errors, touched, handleChange, handleBlur } = formState;
  const { required = false, ...otherOptions } = options;
  return {
    name,
    value: values[name] || "",
    onChange: handleChange,
    onBlur: handleBlur,
    error: shouldShowError(touched[name], errors[name]),
    required,
    ...otherOptions,
  };
};
export const getSubmitButtonProps = (
  formState,
  requiredFields = [],
  options = {}
) => {
  const { values, errors, isSubmitting } = formState;
  const { disabled = false, ...otherOptions } = options;
  const shouldDisable =
    disabled || !canSubmitForm(values, errors, requiredFields, isSubmitting);
  return {
    type: "submit",
    disabled: shouldDisable,
    ...otherOptions,
  };
};