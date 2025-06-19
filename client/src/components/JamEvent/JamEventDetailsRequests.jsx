import React from "react";
import { Paper, Typography, List } from "@mui/material";
import JamEventRequestItem from "./JamEventRequestItem";
import useTheme from "../../shared/hooks/useTheme";
const JamEventDetailsRequests = ({
  event,
  user,
  isOwner,
  requestActionLoading,
  isCancellingRequest,
  requestToCancel,
  onStatusMenuOpen,
  onCancelRequestClick,
}) => {
  const { theme, isDark, getTextColor } = useTheme();
  if (!event.requests?.length) {
    return null;
  }
  return (
    <Paper
      sx={{
        p: 4,
        background: isDark
          ? `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[900]} 100%)`
          : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[200]} 100%)`,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: getTextColor("primary") }}
      >
        Join Requests (
        {
          event.requests.filter(
            (request) => isOwner || request.approvalStatus !== false
          ).length
        }{" "}
        of {event.requests.length})
      </Typography>
      {!isOwner &&
        event.requests.some((request) => request.approvalStatus === false) && (
          <Typography
            variant="body2"
            sx={{
              mb: 2,
              color: getTextColor("secondary"),
            }}
          >
            Note: Denied requests are hidden from public view
          </Typography>
        )}
      <List
        dense
        sx={{
          width: "100%",
          maxHeight: "none",
          overflow: "visible",
        }}
      >
        {event.requests
          .filter((request) => isOwner || request.approvalStatus !== false)
          .map((request) => (
            <JamEventRequestItem
              key={request._id}
              request={request}
              user={user}
              isOwner={isOwner}
              requestActionLoading={requestActionLoading}
              isCancellingRequest={isCancellingRequest}
              requestToCancel={requestToCancel}
              onStatusMenuOpen={onStatusMenuOpen}
              onCancelRequestClick={onCancelRequestClick}
            />
          ))}
      </List>
    </Paper>
  );
};
export default JamEventDetailsRequests;