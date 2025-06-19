import React from "react";
import { useNavigate } from "react-router-dom";
import { CardHeader, Avatar, Typography, Tooltip, Stack } from "@mui/material";
import { CalendarToday, LocationOn } from "@mui/icons-material";
import {
  formatDateTime,
  getInitials,
  getProfilePictureUrl,
} from "../../utils/formatters";
import useTheme from "../../shared/hooks/useTheme";
export default function UnifiedEventCardHeader({
  type,
  eventData,
  getTitleFontSize,
}) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const handleAvatarClick = (e) => {
    e.stopPropagation();
    if (eventData?.createdBy?.username) {
      navigate(`/profile/${eventData.createdBy.username}`);
    }
  };
  const getTitle = () => {
    if (type === "request") {
      return eventData?.title || "Event";
    }
    return eventData?.title?.toUpperCase();
  };
  const getTooltipTitle = () => {
    if (type === "request") {
      return typeof eventData?.createdBy === "object" &&
        eventData?.createdBy?.username
        ? eventData.createdBy.username
        : "Event Organizer";
    }
    return eventData?.createdBy?.username || eventData?.createdBy;
  };
  const getAvatarInitials = () => {
    if (type === "request") {
      return typeof eventData?.createdBy === "object" &&
        eventData?.createdBy?.username
        ? getInitials(eventData.createdBy.username)
        : getInitials("Event Organizer");
    }
    return getInitials(eventData?.createdBy?.username || eventData?.createdBy);
  };
  return (
    <CardHeader
      sx={{
        alignItems: "flex-start",
        "& .MuiCardHeader-avatar": {
          marginTop: 0,
        },
      }}
      avatar={
        <Tooltip title={getTooltipTitle()}>
          <Avatar
            onClick={handleAvatarClick}
            sx={{
              bgcolor: theme.palette.primary.main,
              cursor: eventData?.createdBy?.username ? "pointer" : "default",
              "&:hover": eventData?.createdBy?.username
                ? {
                    opacity: 0.8,
                    transform: "scale(1.05)",
                  }
                : {},
              transition: "all 0.2s ease-in-out",
            }}
            src={getProfilePictureUrl(eventData?.createdBy?.profilePicture)}
            alt={`${
              eventData?.createdBy?.username || eventData?.createdBy || "User"
            }'s profile picture`}
            aria-label={eventData?.createdBy?.username || eventData?.createdBy}
          >
            {getAvatarInitials()}
          </Avatar>
        </Tooltip>
      }
      title={getTitle()}
      subheader={
        <Stack spacing={0.5}>
          <Typography
            variant="caption"
            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
          >
            <CalendarToday fontSize="small" />
            {eventData ? formatDateTime(eventData.scheduledTo) : "No date"}
          </Typography>
          {eventData?.location?.city && (
            <Typography
              variant="caption"
              sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
            >
              <LocationOn fontSize="small" />
              {eventData.location.city}, {eventData.location.country}
            </Typography>
          )}
        </Stack>
      }
      slotProps={{
        title: {
          sx: {
            fontSize: getTitleFontSize(getTitle() || ""),
            lineHeight: 1.2,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          },
        },
      }}
    />
  );
}