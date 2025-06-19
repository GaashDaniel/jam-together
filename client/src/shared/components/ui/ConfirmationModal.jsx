import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { Close, Warning, Delete, Error } from "@mui/icons-material";
import { getAccessibleModalProps } from "../../../utils/focusUtils";
export default function ConfirmationModal({
  open,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  type = "default", 
  loading = false,
  disabled = false,
}) {
  const getTypeConfig = () => {
    switch (type) {
      case "delete":
        return {
          icon: <Delete color="error" sx={{ fontSize: 48 }} />,
          confirmButtonColor: "error",
          defaultTitle: "Delete Item",
          defaultMessage:
            "Are you sure you want to delete this item? This action cannot be undone. You will be able to create a new one.",
        };
      case "warning":
        return {
          icon: <Warning color="warning" sx={{ fontSize: 48 }} />,
          confirmButtonColor: "warning",
          defaultTitle: "Warning",
          defaultMessage: "Please confirm this action.",
        };
      case "error":
        return {
          icon: <Error color="error" sx={{ fontSize: 48 }} />,
          confirmButtonColor: "error",
          defaultTitle: "Error Action",
          defaultMessage: "This action may cause issues. Are you sure?",
        };
      default:
        return {
          icon: null,
          confirmButtonColor: "primary",
          defaultTitle: "Confirm Action",
          defaultMessage: "Are you sure you want to proceed?",
        };
    }
  };
  const typeConfig = getTypeConfig();
  const displayTitle =
    title === "Confirm Action" ? typeConfig.defaultTitle : title;
  const displayMessage =
    message === "Are you sure you want to proceed?"
      ? typeConfig.defaultMessage
      : message;
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  };
  const handleClose = () => {
    if (!loading && onClose) {
      onClose();
    }
  };
  const modalProps = getAccessibleModalProps(open, handleClose);
  return (
    <Dialog
      {...modalProps}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: "200px",
        },
      }}
    >
      <IconButton
        onClick={handleClose}
        disabled={loading}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "grey.500",
        }}
        size="small"
      >
        <Close />
      </IconButton>
      <DialogTitle sx={{ pb: 1, pr: 5 }}>
        <Typography variant="h6" component="h2" fontWeight="bold">
          {displayTitle}
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
          {typeConfig.icon && (
            <Box sx={{ flexShrink: 0, mt: 1 }}>{typeConfig.icon}</Box>
          )}
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body1" color="text.primary">
              {displayMessage}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button
          onClick={handleClose}
          disabled={loading}
          variant="outlined"
          size="large"
        >
          {cancelText}
        </Button>
        <Button
          onClick={handleConfirm}
          disabled={disabled || loading}
          variant="contained"
          color={typeConfig.confirmButtonColor}
          size="large"
          autoFocus
        >
          {loading ? "Processing..." : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}