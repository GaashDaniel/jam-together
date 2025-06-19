import React from "react";
import { TextField } from "@mui/material";
import ProfilePictureUpload from "../ProfilePictureUpload";
const BasicInfoSection = ({
  formData,
  onInputChange,
  onProfilePictureChange,
  username,
  loading,
}) => {
  return (
    <>
      <ProfilePictureUpload
        currentPicture={formData.profilePicture}
        onPictureChange={onProfilePictureChange}
        username={username}
        disabled={loading}
      />
      <TextField
        fullWidth
        name="fullName"
        label="Full Name (Optional)"
        value={formData.fullName}
        onChange={(e) => onInputChange("fullName", e.target.value)}
        margin="normal"
        disabled={loading}
      />
    </>
  );
};
BasicInfoSection.displayName = "BasicInfoSection";
export default BasicInfoSection;