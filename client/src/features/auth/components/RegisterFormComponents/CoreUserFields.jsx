import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import FormikInputField from "../../../../shared/components/ui/FormikInputField";
const CoreUserFields = ({ formikBag }) => {
  return (
    <>
      <FormikInputField
        name="username"
        label="Username"
        formikBag={formikBag}
        autoComplete="username"
      />
      <FormikInputField
        name="email"
        label="Email"
        type="email"
        formikBag={formikBag}
        autoComplete="email"
      />
      <FormikInputField
        name="fullName"
        label="Full Name (Optional)"
        formikBag={formikBag}
        autoComplete="name"
      />
    </>
  );
};
CoreUserFields.displayName = "CoreUserFields";
export default CoreUserFields;