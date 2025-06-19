import React from "react";
import { DialogActions, Button } from "@mui/material";
export default function EventModalActions({
  onClose,
  isSubmitting,
  canSubmit,
  isValid,
  dirty,
  submitIcon: SubmitIcon,
  submitText,
  submitingText,
}) {
  return (
    <DialogActions sx={{ p: 3, gap: 1 }}>
      <Button variant="outlined" onClick={onClose} disabled={isSubmitting}>
        Cancel
      </Button>
      <Button
        type="submit"
        variant="contained"
        disabled={!canSubmit(isValid, dirty)}
        startIcon={<SubmitIcon />}
      >
        {isSubmitting ? submitingText : submitText}
      </Button>
    </DialogActions>
  );
}