import React from "react";
import { Box } from "@mui/material";
import JamEventsHeader from "../../../components/JamEvent/JamEventsHeader";
import JamEventsSearchControls from "../../../components/JamEvent/JamEventsSearchControls";
import JamEventsActiveFilters from "../../../components/JamEvent/JamEventsActiveFilters";
import JamEventsResultsSummary from "../../../components/JamEvent/JamEventsResultsSummary";
import EventFilters from "../../../components/Common/EventFilters";
const EventsPageHeader = ({
  user,
  filters,
  onSearch,
  showFilters,
  onToggleFilters,
  activeFiltersCount,
  onClearFilters,
  baseViewMode,
  onViewModeChange,
  isSmallScreen,
  onCreateEvent,
  onFilterChange,
  isLoading,
  totalEvents,
  getTextColor,
}) => (
  <Box sx={{ mb: 4 }}>
    <JamEventsHeader user={user} onCreateEvent={onCreateEvent} />
    <JamEventsSearchControls
      filters={filters}
      onSearch={onSearch}
      showFilters={showFilters}
      onToggleFilters={onToggleFilters}
      activeFiltersCount={activeFiltersCount}
      onClearFilters={onClearFilters}
      viewMode={baseViewMode}
      onViewModeChange={onViewModeChange}
      isSmallScreen={isSmallScreen}
    />
    {showFilters && (
      <EventFilters
        filters={filters}
        onFilterChange={onFilterChange}
        onClose={() => onToggleFilters(false)}
      />
    )}
    <JamEventsActiveFilters
      filters={filters}
      onFilterChange={onFilterChange}
      activeFiltersCount={activeFiltersCount}
    />
    <JamEventsResultsSummary
      isLoading={isLoading}
      totalEvents={totalEvents}
      getTextColor={getTextColor}
    />
  </Box>
);
export default EventsPageHeader;