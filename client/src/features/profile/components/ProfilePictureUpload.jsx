import React, { useState, useRef } from "react";
import { Box, Avatar, Button, Stack, Typography } from "@mui/material";
import { PhotoCamera, Delete } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useToast } from "../../hooks/useToast";
import { api } from "../../services/api";
import { getInitials, getProfilePictureUrl } from "../../utils/formatters";
export default function ProfilePictureUpload({
  currentPicture,
  onPictureChange,
  username = "U",
  disabled = false,
}) {
  const theme = useTheme();
  const { showToast } = useToast();
  const fileInputRef = useRef(null);
  const [uploadingPicture, setUploadingPicture] = useState(false);
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleProfilePictureUpload(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  const handleProfilePictureUpload = async (file) => {
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      showToast(
        "Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.",
        "error"
      );
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      showToast("File size must be less than 5MB.", "error");
      return;
    }
    try {
      setUploadingPicture(true);
      const formData = new FormData();
      formData.append("profilePicture", file);
      const response = await api.post("/upload/profile-picture", formData);
      onPictureChange(response.profilePicture);
      showToast("Profile picture uploaded successfully!", "success");
    } catch (error) {
      showToast(error.message || "Failed to upload profile picture", "error");
    } finally {
      setUploadingPicture(false);
    }
  };
  const handleDeleteProfilePicture = async () => {
    try {
      setUploadingPicture(true);
      await api.delete("/upload/profile-picture");
      onPictureChange("");
      showToast("Profile picture deleted successfully!", "success");
    } catch (error) {
      showToast(error.message || "Failed to delete profile picture", "error");
    } finally {
      setUploadingPicture(false);
    }
  };
  return (
    <Box sx={{ textAlign: "center", mb: 3 }}>
      <Avatar
        src={getProfilePictureUrl(currentPicture)}
        alt="Profile picture"
        sx={{
          width: 80,
          height: 80,
          mx: "auto",
          mb: 2,
          bgcolor: theme.palette.primary.main,
        }}
      >
        {getInitials(username)}
      </Avatar>
      {}
      <input
        ref={fileInputRef}
        type="file"
        accept="image}
      <Stack direction="row" spacing={1} justifyContent="center">
        <Button
          size="small"
          variant="outlined"
          startIcon={<PhotoCamera />}
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadingPicture || disabled}
        >
          {uploadingPicture ? "Uploading..." : "Upload Photo"}
        </Button>
        {currentPicture && (
          <Button
            size="small"
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={handleDeleteProfilePicture}
            disabled={uploadingPicture || disabled}
          >
            Delete
          </Button>
        )}
      </Stack>
      <Typography
        variant="caption"
        color="text.secondary"
        display="block"
        sx={{ mt: 1 }}
      >
        Upload a profile picture (max 5MB, JPEG, PNG, GIF, WebP)
      </Typography>
    </Box>
  );
}