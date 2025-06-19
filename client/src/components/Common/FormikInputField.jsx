import React from "react";
import { TextField } from "@mui/material";
import { getIn } from "formik";
const FormikInputField = ({ name, label, formikBag, ...props }) => {
  const { values, errors, touched, handleChange, handleBlur } = formikBag;
  return (
    <TextField
      fullWidth
      id={name}
      name={name}
      label={label}
      value={getIn(values, name)}
      onChange={handleChange}
      onBlur={handleBlur}
      error={getIn(touched, name) && Boolean(getIn(errors, name))}
      helperText={getIn(touched, name) && getIn(errors, name)}
      margin="normal"
      {...props}
    />
  );
};
export default FormikInputField;