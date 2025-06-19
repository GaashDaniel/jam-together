import React from "react";
import { IconButton, CircularProgress } from "@mui/material";
export default function LoadingIconButton({
  loading = false,
  children,
  disabled = false,
  onClick,
  loadingSize = 24,
  ...other
}) {
  const handleClick = (event) => {
    if (!loading && onClick) {
      onClick(event);
    }
  };
  return (
    <IconButton
      disabled={disabled || loading}
      onClick={loading ? undefined : handleClick}
      {...other}
    >
      {loading ? <CircularProgress size={loadingSize} /> : children}
    </IconButton>
  );
}