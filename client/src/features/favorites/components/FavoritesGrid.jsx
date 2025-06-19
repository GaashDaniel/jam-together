import React from "react";
import { Box, Typography, Button, Grid, Alert } from "@mui/material";
import { Favorite, Event } from "@mui/icons-material";
import JamEventCard from "../../events/components/JamEventCard";
const FavoritesEmptyState = ({ navigate }) => (
  <Box sx={{ textAlign: "center", py: 8 }}>
    <Favorite
      sx={{
        fontSize: 64,
        color: "text.secondary",
        mb: 2,
        opacity: 0.5,
      }}
    />
    <Typography variant="h5" color="text.secondary" gutterBottom>
      No favorite events yet
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
      Start exploring events and like the ones you are interested in!
    </Typography>
    <Button
      variant="contained"
      startIcon={<Event />}
      onClick={() => navigate("/events")}
    >
      Browse Events
    </Button>
  </Box>
);
const FavoritesGrid = ({
  favoriteEvents,
  filteredEvents,
  onRemoveFromFavorites,
  onEditEvent,
  onDeleteEvent,
  navigate,
}) => {
  if (favoriteEvents.length === 0) {
    return <FavoritesEmptyState navigate={navigate} />;
  }
  if (filteredEvents.length === 0) {
    return (
      <Alert severity="info" sx={{ mb: 3 }}>
        No events match your current filters. Try adjusting your search
        criteria.
      </Alert>
    );
  }
  return (
    <Grid container spacing={3}>
      {filteredEvents.map((event) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={event._id}>
          <Box sx={{ position: "relative" }}>
            <JamEventCard
              jamEvent={event}
              mode="preview"
              onLike={() => onRemoveFromFavorites(event._id)}
              onEdit={onEditEvent}
              onDelete={onDeleteEvent}
            />
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};
export default FavoritesGrid;