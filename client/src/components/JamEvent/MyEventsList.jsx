import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Paper, List, Typography } from "@mui/material";
import JamEventCard from "../../features/events/components/JamEventCard";
import JamEventsListItem from "./JamEventsListItem";
import useTheme from "../../shared/hooks/useTheme";
export default function MyEventsList({
  events,
  viewMode,
  user,
  likingEvents,
  onLike,
  onEdit,
  onDelete,
  menuAnchorEl,
  selectedEvent,
  onMenuOpen,
  onMenuClose,
}) {
  const navigate = useNavigate();
  const { theme, isDark, getThemeColor, getTextColor } = useTheme();

  const handleNavigate = (path) => {
    navigate(path);
  };

  if (events.length === 0)
    return (
      <Paper
        sx={{
          p: 4,
          textAlign: "center",
          background: isDark
            ? `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[900]} 100%)`
            : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[200]} 100%)`,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Typography variant="h6" gutterBottom>
          No events found
        </Typography>
        <Typography variant="body2">
          Try adjusting your filters or search terms
        </Typography>
      </Paper>
    );

  return (
    <>
      {viewMode === "grid" ? (
        <Grid container spacing={3} sx={{ alignItems: "stretch" }}>
          {events.map((event) => (
            <Grid
              size={{ xs: 12, sm: 6, md: 4 }}
              key={event._id}
              sx={{ display: "flex" }}
            >
              <JamEventCard
                jamEvent={event}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper
          sx={{
            background: isDark
              ? `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[900]} 100%)`
              : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[200]} 100%)`,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <List>
            {events.map((event, index) => (
              <JamEventsListItem
                key={event._id}
                event={event}
                index={index}
                totalEvents={events.length}
                user={user}
                onLike={onLike}
                likingEvents={likingEvents}
                onNavigate={handleNavigate}
                onMenuOpen={onMenuOpen}
              />
            ))}
          </List>
        </Paper>
      )}
    </>
  );
}
