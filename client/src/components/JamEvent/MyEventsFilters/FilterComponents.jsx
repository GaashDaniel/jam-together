import React from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { FilterList, Clear, GridView, ViewList } from "@mui/icons-material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
export const GENRES = [
  "jazz",
  "rock",
  "blues",
  "classical",
  "pop",
  "folk",
  "metal",
  "country",
  "reggae",
  "electronic",
  "hip-hop",
  "alternative",
];
export const FilterToggleButton = React.memo(
  ({ showFilters, onToggle, activeCount }) => (
    <Button
      variant={showFilters ? "contained" : "outlined"}
      startIcon={<FilterList />}
      onClick={onToggle}
      size="small"
    >
      Filters {activeCount > 0 && `(${activeCount})`}
    </Button>
  )
);
export const ClearFiltersButton = React.memo(
  ({ onClearFilters, activeCount }) =>
    activeCount > 0 ? (
      <Button
        variant="text"
        onClick={onClearFilters}
        startIcon={<Clear />}
        size="small"
      >
        Clear All
      </Button>
    ) : null
);
export const ViewModeToggle = React.memo(
  ({ viewMode, onViewModeChange, isSmallScreen }) =>
    !isSmallScreen ? (
      <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={onViewModeChange}
        size="small"
      >
        <ToggleButton value="grid">
          <GridView />
        </ToggleButton>
        <ToggleButton value="list">
          <ViewList />
        </ToggleButton>
      </ToggleButtonGroup>
    ) : null
);
export const StatusToggleButtons = React.memo(({ status, onStatusChange }) => (
  <ToggleButtonGroup
    value={status}
    exclusive
    onChange={(event, newStatus) => {
      if (newStatus !== null) {
        onStatusChange(newStatus);
      }
    }}
    size="small"
  >
    <ToggleButton value="all">All</ToggleButton>
    <ToggleButton value="upcoming">Upcoming</ToggleButton>
    <ToggleButton value="past">Past</ToggleButton>
    <ToggleButton value="cancelled">Cancelled</ToggleButton>
  </ToggleButtonGroup>
));
export const DateRangeFilter = React.memo(
  ({ dateFrom, dateTo, onDateChange }) => (
    <Box>
      <Typography variant="subtitle2" gutterBottom>
        Event Date Range
      </Typography>
      <Stack direction="row" spacing={2}>
        <DatePicker
          label="From"
          value={dateFrom ? new Date(dateFrom) : null}
          onChange={(date) =>
            onDateChange(
              "dateFrom",
              date ? date.toLocaleDateString("en-CA") : ""
            )
          }
          slotProps={{
            textField: { size: "small", fullWidth: true },
          }}
        />
        <DatePicker
          label="To"
          value={dateTo ? new Date(dateTo) : null}
          onChange={(date) =>
            onDateChange("dateTo", date ? date.toLocaleDateString("en-CA") : "")
          }
          slotProps={{
            textField: { size: "small", fullWidth: true },
          }}
        />
      </Stack>
    </Box>
  )
);
export const GenreFilter = React.memo(({ genres, onGenreChange }) => (
  <FormControl size="small" sx={{ minWidth: 200 }}>
    <InputLabel>Genres</InputLabel>
    <Select
      multiple
      value={genres}
      onChange={(event) => {
        const value = event.target.value;
        onGenreChange(typeof value === "string" ? value.split(",") : value);
      }}
      renderValue={(selected) => (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {selected.map((value) => (
            <Chip key={value} label={value} size="small" />
          ))}
        </Box>
      )}
    >
      {GENRES.map((genre) => (
        <MenuItem key={genre} value={genre}>
          {genre.charAt(0).toUpperCase() + genre.slice(1)}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
));
export const FilterResultsDisplay = React.memo(
  ({ eventsCount, filteredCount, getTextColor }) => (
    <Typography variant="body2" sx={{ color: getTextColor("secondary") }}>
      {filteredCount === 0
        ? eventsCount === 0
          ? "You haven't created any events yet."
          : "No events match your current filters."
        : `Showing ${filteredCount} of ${eventsCount} event${
            eventsCount !== 1 ? "s" : ""
          }.`}
    </Typography>
  )
);