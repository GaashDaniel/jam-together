import React from "react";
import { Container } from "@mui/material";
import { useEventsPage } from "../hooks/useEventsPage";
import useTheme from "../../../shared/hooks/useTheme";
import EventsPageHeader from "../components/EventsPageHeader";
import EventsDisplay from "../components/EventsDisplay";
import EventsContextMenu from "../components/EventsContextMenu";
import CreateEventModal from "../components/CreateEventModal";
const JamEventsPage = () => {
  const { getBackgroundColor, getTextColor } = useTheme();
  const {
    user,
    filters,
    events,
    isLoading,
    error,
    showFilters,
    createModalOpen,
    page,
    baseViewMode,
    viewMode,
    totalPages,
    totalEvents,
    likingEvents,
    menuAnchorEl,
    selectedEvent,
    activeFiltersCount,
    isSmallScreen,
    setShowFilters,
    setCreateModalOpen,
    handleSearch,
    handleFilterChange,
    handleClearFilters,
    handlePageChange,
    handleEventCreated,
    handleViewModeChange,
    handleLike,
    handleMenuOpen,
    handleMenuClose,
    handleViewEvent,
    handleEditEvent,
    handleDeleteEvent,
  } = useEventsPage();
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        backgroundColor: getBackgroundColor(),
        minHeight: "100vh",
      }}
    >
      <EventsPageHeader
        user={user}
        filters={filters}
        onSearch={handleSearch}
        showFilters={showFilters}
        onToggleFilters={setShowFilters}
        activeFiltersCount={activeFiltersCount}
        onClearFilters={handleClearFilters}
        baseViewMode={baseViewMode}
        onViewModeChange={handleViewModeChange}
        isSmallScreen={isSmallScreen}
        onCreateEvent={() => setCreateModalOpen(true)}
        onFilterChange={handleFilterChange}
        isLoading={isLoading}
        totalEvents={totalEvents}
        getTextColor={getTextColor}
      />
      <EventsDisplay
        isLoading={isLoading}
        error={error}
        events={events}
        viewMode={viewMode}
        user={user}
        onLike={handleLike}
        likingEvents={likingEvents}
        onNavigate={(path) => (window.location.href = path)}
        onMenuOpen={handleMenuOpen}
        onEdit={handleEditEvent}
        onDelete={handleDeleteEvent}
        totalPages={totalPages}
        currentPage={page}
        onPageChange={handlePageChange}
      />
      <CreateEventModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onEventCreated={handleEventCreated}
      />
      <EventsContextMenu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        onViewEvent={handleViewEvent}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
      />
    </Container>
  );
};
export default JamEventsPage;