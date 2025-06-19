import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { Favorite } from "@mui/icons-material";
const FavoritesHeader = ({
  favoriteEvents,
  filteredEvents,
  availableGenres,
}) => (
  <Box sx={{ mb: 4 }}>
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
      <Favorite color="error" sx={{ fontSize: 32 }} />
      <Typography variant="h4" component="h1" fontWeight="bold">
        My Favorites
      </Typography>
    </Box>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
      Manage and organize your favorite jam session events
    </Typography>
    <Stack direction="row" spacing={4} alignItems="center">
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          {favoriteEvents.length}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Total Favorites
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="secondary">
          {filteredEvents.length}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Showing
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="info.main">
          {availableGenres.length}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Genres
        </Typography>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" fontWeight="bold" color="warning.main">
          {favoriteEvents.filter((e) => e.isPastEvent).length}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Past Events
        </Typography>
      </Box>
    </Stack>
  </Box>
);
export default FavoritesHeader;