import React, { useEffect } from "react";
import { Dialog } from "@mui/material";
export default function AccessibleDialog({
  open,
  onClose,
  children,
  ...props
}) {
  useEffect(() => {
    if (open) {
      const activeElement = document.activeElement;
      if (activeElement && activeElement !== document.body) {
        activeElement.blur();
      }
    }
  }, [open]);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableAutoFocus={false}
      disableEnforceFocus={false}
      disableRestoreFocus={false}
      onTransitionEnter={() => {
        const activeElement = document.activeElement;
        if (activeElement && activeElement !== document.body) {
          activeElement.blur();
        }
      }}
      {...props}
    >
      {children}
    </Dialog>
  );
}