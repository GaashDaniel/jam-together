import React from "react";
import { DialogTitle, Typography, Box, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";
export default function EventModalHeader({
  icon: Icon,
  title,
  subtitle,
  onClose,
  isSubmitting = false,
}) {
  return (
    <DialogTitle
      sx={{ m: 0, p: 2, display: "flex", alignItems: "center", gap: 2 }}
    >
      <Icon color="primary" />
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" component="div" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
      <IconButton
        aria-label="close"
        onClick={onClose}
        disabled={isSubmitting}
        sx={{ color: "grey.500" }}
      >
        <Close />
      </IconButton>
    </DialogTitle>
  );
}