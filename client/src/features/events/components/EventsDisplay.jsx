import React from "react";
import { Box } from "@mui/material";
import JamEventsList from "../../../components/JamEvent/JamEventsList";
import JamEventsPagination from "../../../components/JamEvent/JamEventsPagination";
import JamEventsErrorState from "../../../components/JamEvent/JamEventsErrorState";
import LoadingSpinner from "../../../shared/components/ui/LoadingSpinner";
const EventsDisplay = ({
  isLoading,
  error,
  events,
  viewMode,
  user,
  onLike,
  likingEvents,
  onNavigate,
  onMenuOpen,
  onEdit,
  onDelete,
  totalPages,
  currentPage,
  onPageChange,
}) => {
  if (error) {
    return <JamEventsErrorState error={error} />;
  }
  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <Box>
      <JamEventsList
        events={events}
        viewMode={viewMode}
        user={user}
        onLike={onLike}
        likingEvents={likingEvents}
        onNavigate={onNavigate}
        onMenuOpen={onMenuOpen}
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <JamEventsPagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </Box>
  );
};
export default EventsDisplay;