import React from "react";
import {
  Box,
  Typography,
  Stack,
  Avatar,
  IconButton,
  Chip,
  Badge,
} from "@mui/material";
import {
  LocationOn,
  CalendarToday,
  Favorite,
  FavoriteBorder,
  Edit,
  Delete,
} from "@mui/icons-material";
import {
  formatDateTime,
  getInitials,
  getProfilePictureUrl,
} from "../../utils/formatters";
import useTheme from "../../shared/hooks/useTheme";
const JamEventDetailsHeader = ({
  event,
  user,
  isOwner,
  isLiked,
  isPastEvent,
  onLike,
  onEdit,
  onDelete,
  onViewProfile,
}) => {
  const { theme, getTextColor, getThemeColor } = useTheme();
  return (
    <>
      {}
      <Box sx={{ mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={getProfilePictureUrl(event.createdBy.profilePicture)}
            alt={`${event.createdBy.username}'s profile picture`}
            onClick={() => onViewProfile(event.createdBy.username)}
            sx={{
              width: 48,
              height: 48,
              bgcolor: theme.palette.primary.main,
              cursor: "pointer",
              "&:hover": {
                opacity: 0.8,
                transform: "scale(1.05)",
              },
              transition: "all 0.2s ease-in-out",
            }}
          >
            {getInitials(event.createdBy.username)}
          </Avatar>
          <Box>
            <Typography
              variant="body1"
              fontWeight="medium"
              sx={{ color: getTextColor("primary") }}
            >
              {event.createdBy.fullName || event.createdBy.username}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: getTextColor("secondary") }}
            >
              @{event.createdBy.username}
            </Typography>
          </Box>
        </Box>
      </Box>
      {}
      <Box sx={{ mb: 3, position: "relative" }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          fontWeight="bold"
          sx={{ color: getTextColor("primary") }}
        >
          {event.title}
        </Typography>
        {}
        {isPastEvent && (
          <Chip
            label="Past Event"
            size="medium"
            color="warning"
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: 2,
              backgroundColor: theme.palette.warning.main,
              color: theme.palette.warning.contrastText,
            }}
          />
        )}
        <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CalendarToday
              fontSize="small"
              sx={{ color: getTextColor("secondary") }}
            />
            <Typography variant="body1" sx={{ color: getTextColor("primary") }}>
              {formatDateTime(event.scheduledTo)}
            </Typography>
          </Box>
          {event.location?.city && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocationOn
                fontSize="small"
                sx={{ color: getTextColor("secondary") }}
              />
              <Typography
                variant="body1"
                sx={{ color: getTextColor("primary") }}
              >
                {event.location.city}, {event.location.country}
              </Typography>
            </Box>
          )}
        </Stack>
        {}
        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <IconButton
            onClick={onLike}
            color={isLiked ? "error" : "default"}
            title={
              isLiked
                ? "Unlike / Remove from Favorites"
                : "Like / Add to Favorites"
            }
            sx={{
              color: isLiked
                ? theme.palette.error.main
                : getTextColor("secondary"),
              "&:hover": {
                backgroundColor: isLiked
                  ? getThemeColor("#ffebee", "#2a1a1a")
                  : getThemeColor("#f5f5f5", "#2a2a2a"),
              },
            }}
          >
            <Badge badgeContent={(event.likes || []).length} color="primary">
              {isLiked ? <Favorite /> : <FavoriteBorder />}
            </Badge>
          </IconButton>
          {isOwner && (
            <>
              <IconButton
                onClick={onEdit}
                title="Edit Event"
                sx={{
                  color: getTextColor("secondary"),
                  "&:hover": {
                    backgroundColor: getThemeColor("#f5f5f5", "#2a2a2a"),
                  },
                }}
              >
                <Edit />
              </IconButton>
              <IconButton
                color="error"
                title="Delete Event"
                onClick={onDelete}
                sx={{
                  color: theme.palette.error.main,
                  "&:hover": {
                    backgroundColor: getThemeColor("#ffebee", "#2a1a1a"),
                  },
                }}
              >
                <Delete />
              </IconButton>
            </>
          )}
        </Stack>
      </Box>
    </>
  );
};
export default JamEventDetailsHeader;