import React from "react";
import {
  Paper,
  Box,
  Avatar,
  Typography,
  Button,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import {
  Edit,
  LocationOn,
  CalendarToday,
  MusicNote,
} from "@mui/icons-material";
import { getInitials, getProfilePictureUrl } from "../../../utils/formatters";
const ProfileSidebar = ({ user, isOwnProfile, theme, isDark, onEditClick }) => (
  <Paper
    sx={{
      p: 3,
      mb: 3,
      background: isDark
        ? `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[900]} 100%)`
        : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[200]} 100%)`,
      border: `1px solid ${theme.palette.divider}`,
    }}
  >
    <Box sx={{ textAlign: "center", mb: 3 }}>
      <Avatar
        src={getProfilePictureUrl(user.profilePicture)}
        alt={`${user.username}'s profile picture`}
        sx={{
          width: 120,
          height: 120,
          mx: "auto",
          mb: 2,
          fontSize: "2rem",
          bgcolor: theme.palette.primary.main,
        }}
      >
        {getInitials(user.username)}
      </Avatar>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        {user.fullName || user.username}
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        @{user.username}
      </Typography>
      {isOwnProfile && (
        <Button
          variant="outlined"
          startIcon={<Edit />}
          size="small"
          sx={{ mt: 1 }}
          onClick={onEditClick}
        >
          Edit Profile
        </Button>
      )}
    </Box>
    <Divider sx={{ mb: 3 }} />
    {user.bio && (
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Bio
        </Typography>
        <Typography variant="body2">{user.bio}</Typography>
      </Box>
    )}
    {(user.city || user.country) && (
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle2" gutterBottom>
          Location
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocationOn fontSize="small" color="action" />
          <Typography variant="body2">
            {[user.city, user.country].filter(Boolean).join(", ")}
          </Typography>
        </Box>
      </Box>
    )}
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle2" gutterBottom>
        Member Since
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <CalendarToday fontSize="small" color="action" />
        <Typography variant="body2">
          {new Date(user.createdAt).toLocaleDateString("en-GB", {
            month: "long",
            year: "numeric",
          })}
        </Typography>
      </Box>
    </Box>
    {user.instruments && user.instruments.length > 0 && (
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          <MusicNote fontSize="small" sx={{ mr: 1, verticalAlign: "middle" }} />
          Instruments
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
          {user.instruments.map((inst, index) => (
            <Chip
              key={index}
              label={`${inst.instrument} (${inst.experienceInYears}y)`}
              size="small"
              variant="outlined"
            />
          ))}
        </Stack>
      </Box>
    )}
  </Paper>
);
export default ProfileSidebar;