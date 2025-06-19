import React from "react";
import { Chip } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import useTheme from "../../shared/hooks/useTheme";
const JamEventRequestStatusChip = ({
  request,
  isOwner,
  requestActionLoading,
  onStatusMenuOpen,
}) => {
  const { theme } = useTheme();
  const getStatusLabel = () => {
    return request.approvalStatus === true
      ? "Approved"
      : request.approvalStatus === false
      ? "Denied"
      : "Pending";
  };
  const getStatusColor = () => {
    return request.approvalStatus === true
      ? "success"
      : request.approvalStatus === false
      ? "error"
      : "warning";
  };
  const getBackgroundColor = () => {
    return request.approvalStatus === true
      ? theme.palette.success.main
      : request.approvalStatus === false
      ? theme.palette.error.main
      : theme.palette.warning.main;
  };
  const getTextColor = () => {
    return request.approvalStatus === true
      ? theme.palette.success.contrastText
      : request.approvalStatus === false
      ? theme.palette.error.contrastText
      : theme.palette.warning.contrastText;
  };
  const getHoverColor = () => {
    return request.approvalStatus === true
      ? theme.palette.success.dark
      : request.approvalStatus === false
      ? theme.palette.error.dark
      : theme.palette.warning.dark;
  };
  if (isOwner) {
    return (
      <Chip
        label={getStatusLabel()}
        size="small"
        color={getStatusColor()}
        onClick={(e) => onStatusMenuOpen(e, request._id)}
        icon={<MoreVert fontSize="small" />}
        clickable
        disabled={requestActionLoading[request._id]}
        sx={{
          cursor: "pointer",
          backgroundColor: getBackgroundColor(),
          color: getTextColor(),
          "&:hover": {
            backgroundColor: getHoverColor(),
          },
        }}
      />
    );
  }
  if (request.approvalStatus === true) {
    return (
      <Chip
        label="Approved"
        size="small"
        color="success"
        sx={{
          backgroundColor: theme.palette.success.main,
          color: theme.palette.success.contrastText,
        }}
      />
    );
  }
  if (request.approvalStatus === null) {
    return (
      <Chip
        label="Pending"
        size="small"
        color="warning"
        sx={{
          backgroundColor: theme.palette.warning.main,
          color: theme.palette.warning.contrastText,
        }}
      />
    );
  }
  return null;
};
export default JamEventRequestStatusChip;