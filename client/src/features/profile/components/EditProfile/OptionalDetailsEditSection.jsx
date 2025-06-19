import React from "react";
import { TextField, Divider } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";

const OptionalDetailsEditSection = ({ formData, onInputChange, loading }) => {
  return (
    <>
      <Divider sx={{ my: 2 }}>Optional Details</Divider>

      <DesktopDatePicker
        label="Birth Date (Optional)"
        format="dd/MM/yyyy"
        value={formData.birthDate}
        onChange={(date) => onInputChange("birthDate", date)}
        disabled={loading}
        slotProps={{
          textField: {
            fullWidth: true,
            margin: "normal",
            name: "birthDate",
          },
        }}
      />

      <TextField
        fullWidth
        name="country"
        label="Country (Optional)"
        value={formData.country}
        onChange={(e) => onInputChange("country", e.target.value)}
        margin="normal"
        disabled={loading}
      />

      <TextField
        fullWidth
        name="city"
        label="City (Optional)"
        value={formData.city}
        onChange={(e) => onInputChange("city", e.target.value)}
        margin="normal"
        disabled={loading}
      />

      <TextField
        fullWidth
        name="bio"
        label="Bio (Optional)"
        multiline
        rows={3}
        value={formData.bio}
        onChange={(e) => onInputChange("bio", e.target.value)}
        margin="normal"
        helperText={`${formData.bio.length}/500 characters`}
        disabled={loading}
      />
    </>
  );
};

OptionalDetailsEditSection.displayName = "OptionalDetailsEditSection";

export default OptionalDetailsEditSection;
