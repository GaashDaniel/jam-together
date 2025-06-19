import React from "react";
import { useNavigate } from "react-router-dom";
import {
  CardHeader,
  Avatar,
  IconButton,
  Typography,
  Stack,
  Tooltip,
} from "@mui/material";
import { LocationOn, CalendarToday, MoreVert } from "@mui/icons-material";
import {
  formatDateTime,
  getInitials,
  getProfilePictureUrl,
} from "../../utils/formatters";
import useTheme from "../../shared/hooks/useTheme";
const JamEventCardHeader = ({
  eventData,
  isOwner,
  onMenuOpen,
  getTitleFontSize,
}) => {
  const navigate = useNavigate();
  const { theme, getTextColor, getBackgroundColor, getThemeColor } = useTheme();
  return (
    <>
      {}
      {isOwner && (
        <Tooltip title="Owner actions">
          <IconButton
            aria-label="owner actions"
            onClick={onMenuOpen}
            size="small"
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              zIndex: 2,
              color: getTextColor("secondary"),
              backgroundColor: getBackgroundColor("paper"),
              backdropFilter: "blur(4px)",
              boxShadow: theme.shadows[1],
              "&:hover": {
                backgroundColor: getThemeColor("#f5f5f5", "#2a2a2a"),
                boxShadow: theme.shadows[2],
              },
            }}
          >
            <MoreVert />
          </IconButton>
        </Tooltip>
      )}
      <CardHeader
        sx={{
          alignItems: "flex-start",
          "& .MuiCardHeader-avatar": {
            marginTop: 0,
          },
        }}
        avatar={
          <Tooltip title={eventData.createdBy?.username || eventData.createdBy}>
            <Avatar
              onClick={(e) => {
                e.stopPropagation();
                if (eventData.createdBy?.username) {
                  navigate(`/profile/${eventData.createdBy.username}`);
                }
              }}
              sx={{
                bgcolor: theme.palette.primary.main,
                cursor: eventData.createdBy?.username ? "pointer" : "default",
                "&:hover": eventData.createdBy?.username
                  ? {
                      opacity: 0.8,
                      transform: "scale(1.05)",
                    }
                  : {},
                transition: "all 0.2s ease-in-out",
              }}
              src={getProfilePictureUrl(eventData.createdBy?.profilePicture)}
              alt={`${
                eventData.createdBy?.username || eventData.createdBy
              }'s profile picture`}
              aria-label={eventData.createdBy?.username || eventData.createdBy}
            >
              {getInitials(
                eventData.createdBy?.username || eventData.createdBy
              )}
            </Avatar>
          </Tooltip>
        }
        title={eventData.title.toUpperCase()}
        subheader={
          <Stack spacing={0.5}>
            <Typography
              variant="caption"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                color: getTextColor("secondary"),
              }}
            >
              <CalendarToday
                fontSize="small"
                sx={{ color: getTextColor("secondary") }}
              />
              {formatDateTime(eventData.scheduledTo)}
            </Typography>
            {eventData.location?.city && (
              <Typography
                variant="caption"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                  color: getTextColor("secondary"),
                }}
              >
                <LocationOn
                  fontSize="small"
                  sx={{ color: getTextColor("secondary") }}
                />
                {eventData.location.city}, {eventData.location.country}
              </Typography>
            )}
          </Stack>
        }
        slotProps={{
          title: {
            sx: {
              fontSize: getTitleFontSize(eventData.title),
              lineHeight: 1.2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: getTextColor("primary"),
            },
          },
          subheader: {
            sx: {
              color: getTextColor("secondary"),
            },
          },
        }}
      />
    </>
  );
};
export default JamEventCardHeader;