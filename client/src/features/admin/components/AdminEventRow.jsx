import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  Chip,
  Checkbox,
  Avatar,
  Stack,
  Tooltip,
  Typography,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import { MoreVert, Visibility, Delete } from "@mui/icons-material";
import {
  formatDateTime,
  getInitials,
  getProfilePictureUrl,
} from "../../../utils/formatters";
import useTheme from "../../../shared/hooks/useTheme";
const AdminEventRow = ({
  eventItem,
  isSelected,
  onEventSelection,
  onViewEvent,
  onDeleteEvent,
}) => {
  const { adminTheme, getThemeColor } = useTheme();
  const getEventStatusColor = (status) => {
    switch (status) {
      case "active":
        return "success";
      case "cancelled":
        return "error";
      case "flagged":
        return "warning";
      default:
        return "default";
    }
  };
  return (
    <TableRow
      sx={{
        "&:hover": {
          backgroundColor: getThemeColor("#f8f9fa", "#2a2a2a"),
        },
        backgroundColor: isSelected
          ? getThemeColor("#e3f2fd", "#1a237e")
          : "transparent",
      }}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={isSelected}
          onChange={() => onEventSelection(eventItem._id)}
          sx={{
            color: adminTheme.admin.primary,
            "&.Mui-checked": {
              color: adminTheme.admin.primary,
            },
          }}
        />
      </TableCell>
      <TableCell>
        <Box>
          <Typography
            variant="subtitle2"
            sx={{
              color: adminTheme.admin.primary,
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "none",
              "&:hover": {
                textDecoration: "underline",
              },
            }}
            onClick={() => onViewEvent(eventItem._id)}
          >
            {eventItem.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: adminTheme.admin.text.secondary,
              maxWidth: 200,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {eventItem.content}
          </Typography>
        </Box>
      </TableCell>
      <TableCell>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Avatar
            src={getProfilePictureUrl(eventItem.createdBy?.profilePicture)}
            alt={`${eventItem.createdBy?.username}'s profile`}
            onClick={() => {
              if (eventItem.createdBy?.username) {
                onViewEvent(`/profile/${eventItem.createdBy.username}`);
              }
            }}
            sx={{
              bgcolor: adminTheme.admin.primary,
              width: 32,
              height: 32,
              cursor: eventItem.createdBy?.username ? "pointer" : "default",
              "&:hover": eventItem.createdBy?.username
                ? {
                    opacity: 0.8,
                    transform: "scale(1.05)",
                  }
                : {},
              transition: "all 0.2s ease-in-out",
            }}
          >
            {getInitials(eventItem.createdBy?.username || "U")}
          </Avatar>
          <Typography
            variant="body2"
            sx={{
              color: adminTheme.admin.text.primary,
            }}
          >
            {eventItem.createdBy?.username || "Unknown"}
          </Typography>
        </Box>
      </TableCell>
      <TableCell sx={{ color: adminTheme.admin.text.primary }}>
        {eventItem.location?.city && eventItem.location?.country
          ? `${eventItem.location.city}, ${eventItem.location.country}`
          : "Location not specified"}
      </TableCell>
      <TableCell sx={{ color: adminTheme.admin.text.primary }}>
        {formatDateTime(eventItem.scheduledTo)}
      </TableCell>
      <TableCell>
        <Chip
          label={eventItem.status || "active"}
          color={getEventStatusColor(eventItem.status)}
          size="small"
        />
      </TableCell>
      <TableCell>
        <Stack direction="row" spacing={1}>
          <Tooltip title="View Event">
            <IconButton
              size="small"
              onClick={() => onViewEvent(eventItem._id)}
              sx={{
                color: adminTheme.admin.text.secondary,
              }}
            >
              <Visibility />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Event">
            <IconButton
              size="small"
              color="error"
              onClick={() => onDeleteEvent(eventItem)}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
export default AdminEventRow;