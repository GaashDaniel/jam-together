import { useState } from "react";
import { useToast } from "./useToast";
export const useFormValidation = ({
  initialValues = {},
  validationSchema = null,
  onSubmit,
}) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToast();
  const validateField = async (fieldName, value) => {
    if (!validationSchema) return null;
    try {
      await validationSchema.validateAt(fieldName, {
        ...values,
        [fieldName]: value,
      });
      return null; 
    } catch (error) {
      return error.message;
    }
  };
  const validateForm = async (valuesToValidate = values) => {
    if (!validationSchema) return {};
    try {
      await validationSchema.validate(valuesToValidate, {
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
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setValues((prev) => ({
      ...prev,
      [name]: fieldValue,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };
  const handleBlur = async (event) => {
    const { name } = event.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    const fieldError = await validateField(name, values[name]);
    if (fieldError) {
      setErrors((prev) => ({
        ...prev,
        [name]: fieldError,
      }));
    }
  };
  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    setIsSubmitting(true);
    try {
      const allFieldNames = Object.keys(values);
      const allTouched = {};
      allFieldNames.forEach((name) => {
        allTouched[name] = true;
      });
      setTouched(allTouched);
      const validationErrors = await validateForm(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        const firstError = Object.values(validationErrors)[0];
        showToast(firstError, "error");
        setIsSubmitting(false);
        return;
      }
      setErrors({});
      if (onSubmit) {
        await onSubmit(values, {
          setFieldError: (fieldName, error) => {
            setErrors((prev) => ({ ...prev, [fieldName]: error }));
          },
          resetForm: () => {
            setValues(initialValues);
            setErrors({});
            setTouched({});
            setIsSubmitting(false);
          },
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showToast(error.message || "Form submission failed", "error");
    } finally {
      setIsSubmitting(false);
    }
  };
  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  };
  const getFieldProps = (name) => ({
    name,
    value: values[name] || "",
    onChange: handleChange,
    onBlur: handleBlur,
    error: touched[name] && Boolean(errors[name]),
    helperText: touched[name] && errors[name],
  });
  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    getFieldProps,
    setValues,
    setErrors,
  };
};
export default useFormValidation;