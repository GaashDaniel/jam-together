import React from "react";
import { Box, Typography, Divider, Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import FormikInputField from "../../../../shared/components/ui/FormikInputField";
const OptionalDetailsSection = ({ formikBag }) => {
  const { values, errors, touched, handleBlur, setFieldValue } = formikBag;
  return (
    <>
      <Divider sx={{ my: 2 }}>Optional Details</Divider>
      <DatePicker
        label="Birth Date (Optional)"
        format="dd/MM/yyyy"
        value={values.birthDate}
        onChange={(date) => setFieldValue("birthDate", date)}
        slotProps={{
          textField: {
            fullWidth: true,
            margin: "normal",
            name: "birthDate",
            onBlur: handleBlur,
            error: touched.birthDate && Boolean(errors.birthDate),
            helperText: touched.birthDate && errors.birthDate,
          },
        }}
      />
      <FormikInputField
        name="country"
        label="Country (Optional)"
        formikBag={formikBag}
        autoComplete="country-name"
      />
      <FormikInputField
        name="city"
        label="City (Optional)"
        formikBag={formikBag}
        autoComplete="address-level2"
      />
      <FormikInputField
        name="bio"
        label="Bio (Optional)"
        multiline
        rows={3}
        formikBag={formikBag}
      />
    </>
  );
};
OptionalDetailsSection.displayName = "OptionalDetailsSection";
export default OptionalDetailsSection;