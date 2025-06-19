import React from "react";
import { Dialog, DialogContent, Box, Alert } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { enGB } from "date-fns/locale";
import { useAuth } from "../../hooks/useAuth";
import { useEditProfileForm } from "../../hooks/useEditProfileForm";
import {
  EditProfileHeader,
  BasicInfoSection,
  InstrumentsEditSection,
  OptionalDetailsEditSection,
  EditProfileFooter,
} from "./EditProfile";
export default function EditProfileModal({ open, onClose }) {
  const { user } = useAuth();
  const {
    formData,
    loading,
    error,
    isFormValid,
    setError,
    handleInputChange,
    handleInstrumentChange,
    addInstrument,
    removeInstrument,
    handleSubmit,
    setFormData,
  } = useEditProfileForm(open);
  const handleModalClose = () => {
    if (loading) return;
    onClose();
  };
  const handleFormSubmit = async () => {
    const success = await handleSubmit();
    if (success) {
      onClose();
    }
  };
  const handleProfilePictureChange = (newPicture) => {
    setFormData((prev) => ({
      ...prev,
      profilePicture: newPicture,
    }));
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
      <Dialog
        open={open}
        onClose={handleModalClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <EditProfileHeader onClose={handleModalClose} loading={loading} />
        <DialogContent sx={{ pb: 2 }}>
          <Box sx={{ mt: 1 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <BasicInfoSection
              formData={formData}
              onInputChange={handleInputChange}
              onProfilePictureChange={handleProfilePictureChange}
              username={user?.username}
              loading={loading}
            />
            <InstrumentsEditSection
              formData={formData}
              onInstrumentChange={handleInstrumentChange}
              onAddInstrument={addInstrument}
              onRemoveInstrument={removeInstrument}
              loading={loading}
            />
            <OptionalDetailsEditSection
              formData={formData}
              onInputChange={handleInputChange}
              loading={loading}
            />
          </Box>
        </DialogContent>
        <EditProfileFooter
          onCancel={handleModalClose}
          onSave={handleFormSubmit}
          loading={loading}
          isFormValid={isFormValid}
        />
      </Dialog>
    </LocalizationProvider>
  );
}