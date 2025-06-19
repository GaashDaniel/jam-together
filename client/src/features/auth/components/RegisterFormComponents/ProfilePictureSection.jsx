import React from "react";
import { Box, Avatar, Button, Stack, Typography } from "@mui/material";
import { PhotoCamera, Delete } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import {
  getInitials,
  getProfilePictureUrl,
} from "../../../../utils/formatters";
const ProfilePictureSection = ({
  values,
  imagePreview,
  selectedImageFile,
  fileInputRef,
  onFileSelect,
  onRemoveProfilePicture,
  loading,
}) => {
  const theme = useTheme();
  return (
    <Box sx={{ textAlign: "center", mb: 3 }}>
      <Avatar
        src={imagePreview || getProfilePictureUrl(values.profilePicture)}
        alt="Profile picture"
        sx={{
          width: 80,
          height: 80,
          mx: "auto",
          mb: 2,
          bgcolor: theme.palette.primary.main,
        }}
      >
        {getInitials(values.username || "U")}
      </Avatar>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={onFileSelect}
      />
      <Stack direction="row" spacing={1} justifyContent="center">
        <Button
          size="small"
          variant="outlined"
          startIcon={<PhotoCamera />}
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
        >
          {selectedImageFile ? "Change Photo" : "Select Photo"}
        </Button>
        {selectedImageFile && (
          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={onRemoveProfilePicture}
            disabled={loading}
          >
            Remove
          </Button>
        )}
      </Stack>
      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        sx={{ mt: 1 }}
      >
        {selectedImageFile
          ? `Selected: ${selectedImageFile.name}`
          : "Select a profile picture (max 5MB, JPEG, PNG, GIF, WebP)"}
      </Typography>
    </Box>
  );
};
ProfilePictureSection.displayName = "ProfilePictureSection";
export default ProfilePictureSection;
