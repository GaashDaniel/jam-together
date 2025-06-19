import React from "react";
import { DialogActions, Button } from "@mui/material";
import { Save, Cancel } from "@mui/icons-material";

const EditProfileFooter = ({ onCancel, onSave, loading, isFormValid }) => {
  return (
    <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
      <Button
        onClick={onCancel}
        disabled={loading}
        variant="outlined"
        startIcon={<Cancel />}
        size="large"
      >
        Cancel
      </Button>
      <Button
        onClick={onSave}
        disabled={loading || !isFormValid}
        variant="contained"
        startIcon={<Save />}
        size="large"
      >
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </DialogActions>
  );
};

EditProfileFooter.displayName = "EditProfileFooter";

export default EditProfileFooter;
