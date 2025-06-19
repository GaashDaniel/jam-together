import React from "react";
import { Paper, Box, Stack, useMediaQuery } from "@mui/material";
import SearchBar from "../Common/SearchBar";
import useTheme from "../../shared/hooks/useTheme";
import { useFiltersLogic } from "./MyEventsFilters/useFiltersLogic";
import {
  FilterToggleButton,
  ClearFiltersButton,
  ViewModeToggle,
  StatusToggleButtons,
  DateRangeFilter,
  GenreFilter,
  FilterResultsDisplay,
} from "./MyEventsFilters/FilterComponents";

export default function MyEventsFilters({
  filters,
  onFilterChange,
  onClearFilters,
  viewMode,
  onViewModeChange,
  eventsCount,
  filteredCount,
}) {
  const { theme, isDark, getTextColor } = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:560px)");

  const {
    showFilters,
    activeFiltersCount,
    handleFilterChange,
    handleStatusChange,
    handleGenreChange,
    handleDateChange,
    toggleFilters,
    clearFilters,
  } = useFiltersLogic(filters, onFilterChange, onClearFilters);

  return (
    <Box sx={{ mb: 4 }}>
      <Paper
        sx={{
          p: 2,
          mb: 2,
          background: isDark
            ? `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[900]} 100%)`
            : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[200]} 100%)`,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <SearchBar
          onSearch={(searchTerm) => handleFilterChange("search", searchTerm)}
          initialValue={filters.search}
          placeholder="Search your events by title, location, or description..."
          sx={{ mb: 2 }}
        />

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <FilterToggleButton
            showFilters={showFilters}
            onToggle={toggleFilters}
            activeCount={activeFiltersCount}
          />

          <ClearFiltersButton
            onClearFilters={clearFilters}
            activeCount={activeFiltersCount}
          />

          <Box sx={{ ml: "auto" }}>
            <ViewModeToggle
              viewMode={viewMode}
              onViewModeChange={onViewModeChange}
              isSmallScreen={isSmallScreen}
            />
          </Box>

          <StatusToggleButtons
            status={filters.status}
            onStatusChange={handleStatusChange}
          />
        </Box>

        {showFilters && (
          <Box sx={{ mt: 3, pt: 3, borderTop: 1, borderColor: "divider" }}>
            <Stack spacing={3}>
              <DateRangeFilter
                dateFrom={filters.dateFrom}
                dateTo={filters.dateTo}
                onDateChange={handleDateChange}
              />

              <GenreFilter
                genres={filters.genres}
                onGenreChange={handleGenreChange}
              />
            </Stack>
          </Box>
        )}
      </Paper>

      <FilterResultsDisplay
        eventsCount={eventsCount}
        filteredCount={filteredCount}
        getTextColor={getTextColor}
      />
    </Box>
  );
}
