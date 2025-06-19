import React from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stack,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Clear } from "@mui/icons-material";
const FavoritesFilters = ({
  searchQuery,
  setSearchQuery,
  selectedGenre,
  setSelectedGenre,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  showPastEvents,
  setShowPastEvents,
  availableGenres,
  onClearFilters,
}) => (
  <Grid container spacing={2} alignItems="center">
    <Grid size={{ xs: 12, md: 3 }}>
      <TextField
        fullWidth
        label="Search favorites"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        size="small"
        placeholder="Search by title, location, or content..."
      />
    </Grid>
    <Grid size={{ xs: 12, md: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel>Genre</InputLabel>
        <Select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          label="Genre"
        >
          <MenuItem value="">All Genres</MenuItem>
          {availableGenres.map((genre) => (
            <MenuItem key={genre} value={genre}>
              {genre.charAt(0).toUpperCase() + genre.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
    <Grid size={{ xs: 12, md: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel>Sort By</InputLabel>
        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          label="Sort By"
        >
          <MenuItem value="dateAdded">Date Added</MenuItem>
          <MenuItem value="eventDate">Event Date</MenuItem>
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="likes">Popularity</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid size={{ xs: 12, md: 2 }}>
      <FormControl fullWidth size="small">
        <InputLabel>Order</InputLabel>
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          label="Order"
        >
          <MenuItem value="desc">Newest First</MenuItem>
          <MenuItem value="asc">Oldest First</MenuItem>
        </Select>
      </FormControl>
    </Grid>
    <Grid size={{ xs: 12, md: 3 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <FormControlLabel
          control={
            <Checkbox
              checked={showPastEvents}
              onChange={(e) => setShowPastEvents(e.target.checked)}
              size="small"
            />
          }
          label="Show past events"
        />
        <Button
          startIcon={<Clear />}
          onClick={onClearFilters}
          size="small"
          variant="outlined"
        >
          Clear
        </Button>
      </Stack>
    </Grid>
  </Grid>
);
export default FavoritesFilters;