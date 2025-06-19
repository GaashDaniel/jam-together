import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ListItem,
  Avatar,
  Box,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";
import { Cancel } from "@mui/icons-material";
import { getInitials, getProfilePictureUrl } from "../../utils/formatters";
import JamEventRequestStatusChip from "./JamEventRequestStatusChip";
import useTheme from "../../../shared/hooks/useTheme";
const JamEventRequestItem = ({
  request,
  user,
  isOwner,
  requestActionLoading,
  isCancellingRequest,
  requestToCancel,
  onStatusMenuOpen,
  onCancelRequestClick,
}) => {
  const navigate = useNavigate();
  const { theme, getTextColor, getThemeColor } = useTheme();
  return (
    <ListItem
      key={request._id}
      sx={{
        alignItems: "flex-start",
        flexDirection: "column",
        pb: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "flex-start",
        }}
      >
        <Avatar
          src={getProfilePictureUrl(request.requester.profilePicture)}
          alt={`${request.requester.username}'s profile picture`}
          onClick={() => navigate(`/profile/${request.requester.username}`)}
          sx={{
            mr: 2,
            bgcolor: theme.palette.primary.main,
            cursor: "pointer",
            "&:hover": {
              opacity: 0.8,
              transform: "scale(1.05)",
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          {getInitials(request.requester.username)}
        </Avatar>
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ mb: 1 }}>
            <Typography
              variant="body2"
              fontWeight="medium"
              sx={{ color: getTextColor("primary") }}
            >
              {request.requester.username}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                mb: 1,
                color: getTextColor("secondary"),
              }}
            >
              {new Date(request.createdAt).toLocaleDateString("en-GB")}
            </Typography>
          </Box>
          {request.content && (
            <Typography
              variant="body2"
              sx={{
                mb: 1,
                color: getTextColor("secondary"),
              }}
            >
              {request.content}
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mr: 1,
          }}
        >
          {request.instrument && (
            <Chip
              label={request.instrument.instrument}
              size="small"
              variant="outlined"
              sx={{
                borderColor: getThemeColor("#e0e0e0", "#525252"),
                color: getTextColor("primary"),
                backgroundColor: "transparent",
              }}
            />
          )}
          <JamEventRequestStatusChip
            request={request}
            isOwner={isOwner}
            requestActionLoading={requestActionLoading}
            onStatusMenuOpen={onStatusMenuOpen}
          />
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          {}
          {user &&
            request.requester._id === user._id &&
            request.approvalStatus === null && (
              <IconButton
                size="small"
                color="error"
                onClick={() => onCancelRequestClick(request)}
                disabled={
                  isCancellingRequest && requestToCancel?._id === request._id
                }
                title="Cancel Request"
              >
                <Cancel />
              </IconButton>
            )}
        </Box>
      </Box>
    </ListItem>
  );
};
export default JamEventRequestItem;
