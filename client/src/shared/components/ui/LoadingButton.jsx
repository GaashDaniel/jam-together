import React from "react";
import { Button, CircularProgress } from "@mui/material";
export default function LoadingButton({
  loading = false,
  loadingText,
  children,
  disabled = false,
  onClick,
  ...other
}) {
  const handleClick = (event) => {
    if (!loading && onClick) {
      onClick(event);
    }
  };
  return (
    <Button
      {...other}
      disabled={disabled || loading}
      onClick={handleClick}
      startIcon={loading ? <CircularProgress size={20} /> : other.startIcon}
    >
      {loading ? loadingText || "Loading..." : children}
    </Button>
  );
}