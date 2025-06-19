export const validateSingleField = async (
  validationSchema,
  fieldName,
  value,
  allValues
) => {
  if (!validationSchema) return null;
  try {
    await validationSchema.validateAt(fieldName, {
      ...allValues,
      [fieldName]: value,
    });
    return null;
  } catch (error) {
    return error.message;
  }
};
export const validateAllFields = async (validationSchema, values) => {
  if (!validationSchema) return {};
  try {
    await validationSchema.validate(values, {
      abortEarly: false,
    });
    return {};
  } catch (error) {
    const validationErrors = {};
    if (error.inner) {
      error.inner.forEach((err) => {
        if (err.path) {
          validationErrors[err.path] = err.message;
        }
      });
    }
    return validationErrors;
  }
};
export const checkFormValidity = async (validationSchema, values) => {
  if (!validationSchema) return true;
  try {
    await validationSchema.validate(values, { abortEarly: false });
    return true;
  } catch (error) {
    return false;
  }
};
export const createFieldProps = (
  name,
  values,
  handleChange,
  handleBlur,
  touched,
  errors
) => ({
  name,
  value: values[name] || "",
  onChange: handleChange,
  onBlur: handleBlur,
  error: touched[name] && Boolean(errors[name]),
  helperText: touched[name] && errors[name],
});
export const markAllFieldsTouched = (values) => {
  const allTouched = {};
  Object.keys(values).forEach((name) => {
    allTouched[name] = true;
  });
  return allTouched;
};