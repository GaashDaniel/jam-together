import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Alert,
  useMediaQuery,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useAuth } from "../hooks/useAuth";
import { useMyEvents } from "../hooks/useMyEvents";
import { useMyEventsFilters } from "../hooks/useMyEventsFilters";
import useTheme from "../hooks/useTheme";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import CreateEventModal from "../components/JamEvent/CreateEventModal";
import EditEventModal from "../components/JamEvent/EditEventModal";
import ConfirmationModal from "../shared/components/ui/ConfirmationModal";
import MyEventsFilters from "../components/JamEvent/MyEventsFilters";
import MyEventsList from "../components/JamEvent/MyEventsList";
export default function MyEventsPage() {
  const { user } = useAuth();
  const { theme, getBackgroundColor, getTextColor } = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:560px)");
  const {
    events,
    isLoading,
    error,
    likingEvents,
    handleEventCreated,
    handleEventUpdated,
    handleDeleteEvent,
    handleLike,
  } = useMyEvents();
  const { filters, filteredEvents, handleFilterChange, handleClearFilters } =
    useMyEventsFilters(events);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [baseViewMode, setBaseViewMode] = useState(() => {
    const savedView = localStorage.getItem("myEventsViewMode");
    return savedView || "grid";
  });
  const viewMode = isSmallScreen ? "grid" : baseViewMode;
  const handleMenuOpen = (event, jamEvent) => {
    setMenuAnchorEl(event.currentTarget);
    setSelectedEvent(jamEvent);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedEvent(null);
  };
  const handleEditEvent = (event) => {
    setSelectedEvent(event);
    setEditModalOpen(true);
  };
  const handleDeleteClick = (event) => {
    setSelectedEvent(event);
    setDeleteConfirmOpen(true);
  };
  const handleConfirmDelete = async () => {
    if (!selectedEvent) return;
    try {
      setIsDeleting(true);
      const success = await handleDeleteEvent(selectedEvent);
      if (success) {
        setDeleteConfirmOpen(false);
        setSelectedEvent(null);
      }
    } finally {
      setIsDeleting(false);
    }
  };
  const handleViewModeChange = (event, newViewMode) => {
    if (newViewMode !== null) {
      setBaseViewMode(newViewMode);
      localStorage.setItem("myEventsViewMode", newViewMode);
    }
  };
  const onEventCreated = () => {
    handleEventCreated();
    setCreateModalOpen(false);
  };
  const onEventUpdated = (updatedEvent) => {
    handleEventUpdated(updatedEvent);
    setEditModalOpen(false);
    setSelectedEvent(null);
  };
  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">Please log in to view your events.</Alert>
      </Container>
    );
  }
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Error loading your events: {error}</Alert>
      </Container>
    );
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          backgroundColor: getBackgroundColor(),
          minHeight: "100vh",
        }}
      >
        <Box sx={{ mb: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h4"
              component="h1"
              fontWeight="bold"
              sx={{ color: getTextColor("primary") }}
            >
              My Events
            </Typography>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setCreateModalOpen(true)}
              sx={{
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.dark,
                },
              }}
            >
              Create Event
            </Button>
          </Box>
        </Box>
        <MyEventsFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          viewMode={baseViewMode}
          onViewModeChange={handleViewModeChange}
          eventsCount={events.length}
          filteredCount={filteredEvents.length}
        />
        <MyEventsList
          events={filteredEvents}
          viewMode={viewMode}
          user={user}
          likingEvents={likingEvents}
          onLike={handleLike}
          onEdit={handleEditEvent}
          onDelete={handleDeleteClick}
          menuAnchorEl={menuAnchorEl}
          selectedEvent={selectedEvent}
          onMenuOpen={handleMenuOpen}
          onMenuClose={handleMenuClose}
        />
        <CreateEventModal
          open={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          onEventCreated={onEventCreated}
        />
        <EditEventModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          event={selectedEvent}
          onEventUpdated={onEventUpdated}
        />
        <ConfirmationModal
          open={deleteConfirmOpen}
          onClose={() => setDeleteConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
          type="delete"
          title="Delete Event"
          message={`Are you sure you want to delete "${selectedEvent?.title}"? All join requests will be lost and this action cannot be undone.`}
          confirmText="Delete Event"
          loading={isDeleting}
        />
      </Container>
    </LocalizationProvider>
  );
}