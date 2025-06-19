import React from "react";
import { DialogTitle, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
const EditProfileHeader = ({ onClose, loading }) => {
  return (
    <>
      {}
      <IconButton
        onClick={onClose}
        disabled={loading}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "grey.500",
          zIndex: 1,
        }}
        size="small"
      >
        <Close />
      </IconButton>
      {}
      <DialogTitle sx={{ pb: 2, pr: 5 }}>
        <Typography
          variant="h5"
          component="div"
          fontWeight="bold"
          align="center"
        >
          Edit Profile
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Update your profile information
        </Typography>
      </DialogTitle>
    </>
  );
};
EditProfileHeader.displayName = "EditProfileHeader";
export default EditProfileHeader;