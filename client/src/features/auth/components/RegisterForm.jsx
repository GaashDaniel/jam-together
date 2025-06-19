import React from "react";
import { Formik, Form } from "formik";
import { Box, Typography, Alert } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { enGB } from "date-fns/locale";
import { registerValidationSchema } from "../../../utils/validation";
import { useRegistrationForm } from "../hooks/useRegistrationForm";
import InstrumentsFormSection from "./InstrumentsFormSection";
import {
  ProfilePictureSection,
  CoreUserFields,
  OptionalDetailsSection,
  PasswordSection,
  FormFooter,
} from "./RegisterFormComponents";
export default function RegisterForm({ onSuccess, onSwitchToLogin }) {
  const {
    loading,
    selectedImageFile,
    imagePreview,
    fileInputRef,
    initialValues,
    handleFileSelect,
    handleRemoveProfilePicture,
    handleRegistrationSubmit,
  } = useRegistrationForm(onSuccess);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <Formik
        initialValues={initialValues}
        validationSchema={registerValidationSchema}
        onSubmit={handleRegistrationSubmit}
      >
        {(formikBag) => {
          const { values, errors, touched, handleChange, handleBlur } =
            formikBag;
          return (
            <Form>
              <Box sx={{ mt: 1 }}>
                <Typography variant="h5" gutterBottom align="center">
                  Join JamTogether
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ mb: 3 }}
                >
                  Create an account to start jamming!
                </Typography>
                {errors.submit && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {errors.submit}
                  </Alert>
                )}
                <ProfilePictureSection
                  values={values}
                  imagePreview={imagePreview}
                  selectedImageFile={selectedImageFile}
                  fileInputRef={fileInputRef}
                  onFileSelect={handleFileSelect}
                  onRemoveProfilePicture={handleRemoveProfilePicture}
                  loading={loading}
                />
                <CoreUserFields formikBag={formikBag} />
                <InstrumentsFormSection
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                />
                <OptionalDetailsSection formikBag={formikBag} />
                <PasswordSection formikBag={formikBag} />
                <FormFooter
                  formikBag={formikBag}
                  onSwitchToLogin={onSwitchToLogin}
                />
              </Box>
            </Form>
          );
        }}
      </Formik>
    </LocalizationProvider>
  );
}