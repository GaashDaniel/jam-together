import React from "react";
import { Stack, Box, IconButton, Button, Badge, Tooltip } from "@mui/material";
import {
  Favorite,
  FavoriteBorder,
  Comment,
  MoreVert,
} from "@mui/icons-material";
export const EventItemActions = React.memo(
  ({ event, user, likingEvents, onLike, onNavigate, onMenuOpen }) => (
    <Stack spacing={1} sx={{ alignItems: "flex-end" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Tooltip
          title={
            user && event.likes?.includes(user._id)
              ? "Unlike"
              : "Like (Favorite)"
          }
        >
          <span>
            <IconButton
              aria-label="like favorite"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!user || likingEvents.has(event._id)) return;
                onLike(event._id);
              }}
              disabled={!user || likingEvents.has(event._id)}
              color={
                user && event.likes?.includes(user._id) ? "error" : "default"
              }
              sx={{
                "& .MuiBadge-root": {
                  pointerEvents: "none",
                },
              }}
            >
              <Badge
                badgeContent={event.likes?.length || 0}
                color="primary"
                showZero
              >
                {user && event.likes?.includes(user._id) ? (
                  <Favorite />
                ) : (
                  <FavoriteBorder />
                )}
              </Badge>
            </IconButton>
          </span>
        </Tooltip>
        <Tooltip title="View requests">
          <IconButton
            aria-label="view requests"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onNavigate(`/events/${event._id}`);
            }}
            sx={{
              "& .MuiBadge-root": {
                pointerEvents: "none",
              },
            }}
          >
            <Badge
              badgeContent={event.requestCount || event.requests?.length || 0}
              color="primary"
              showZero
            >
              <Comment />
            </Badge>
          </IconButton>
        </Tooltip>
        {user &&
          event.createdBy &&
          (event.createdBy._id === user._id ||
            event.createdBy === user._id) && (
            <Tooltip title="Owner actions">
              <IconButton
                aria-label="owner actions"
                onClick={(e) => onMenuOpen(e, event)}
                size="small"
              >
                <MoreVert />
              </IconButton>
            </Tooltip>
          )}
      </Box>
      <Button
        size="small"
        variant="outlined"
        sx={{ minWidth: "100px" }}
        onClick={(e) => {
          e.stopPropagation();
          onNavigate(`/events/${event._id}`);
        }}
      >
        View Details
      </Button>
    </Stack>
  )
);
export default EventItemActions;