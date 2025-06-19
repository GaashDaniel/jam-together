import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import FormikInputField from "../../../../shared/components/ui/FormikInputField";
const PasswordSection = ({ formikBag }) => {
  return (
    <>
      <FormikInputField
        name="password"
        label="Password"
        type="password"
        formikBag={formikBag}
        autoComplete="new-password"
      />
      <FormikInputField
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        formikBag={formikBag}
        autoComplete="new-password"
      />
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: 1, display: "block" }}
      >
        Password must contain at least 8 characters with 1 uppercase, 1
        lowercase, 4 digits, and 1 special character
      </Typography>
    </>
  );
};
PasswordSection.displayName = "PasswordSection";
export default PasswordSection;