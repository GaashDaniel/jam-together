import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";
import { useJamEvents } from "../../../hooks/useJamEvents";
import { useAuth } from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast";
import { api } from "../../../services/api";
export const useEventsPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();
  const { showToast } = useToast();
  const isSmallScreen = useMediaQuery("(max-width:560px)");
  const [showFilters, setShowFilters] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [baseViewMode, setBaseViewMode] = useState(() => {
    const urlView = searchParams.get("view");
    if (urlView) return urlView;
    const savedView = localStorage.getItem("jamEventsViewMode");
    return savedView || "grid";
  });
  const viewMode = isSmallScreen ? "grid" : baseViewMode;
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    genres: searchParams.getAll("genre") || [],
    location: searchParams.get("location") || "",
    dateFrom: searchParams.get("dateFrom") || "",
    dateTo: searchParams.get("dateTo") || "",
    instruments: searchParams.getAll("instrument") || [],
  });
  const {
    events: fetchedEvents,
    isLoading,
    error,
    totalPages,
    totalEvents,
    mutate,
  } = useJamEvents({
    ...filters,
    page,
    limit: 12,
  });
  const [events, setEvents] = useState([]);
  const [likingEvents, setLikingEvents] = useState(new Set());
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  useEffect(() => {
    if (fetchedEvents) {
      setEvents(fetchedEvents);
    }
  }, [fetchedEvents]);
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set("search", filters.search);
    if (filters.location) params.set("location", filters.location);
    if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
    if (filters.dateTo) params.set("dateTo", filters.dateTo);
    filters.genres.forEach((genre) => params.append("genre", genre));
    filters.instruments.forEach((instrument) =>
      params.append("instrument", instrument)
    );
    if (page > 1) params.set("page", page.toString());
    if (baseViewMode !== "grid") params.set("view", baseViewMode);
    setSearchParams(params);
  }, [filters, page, baseViewMode, setSearchParams]);
  const handleSearch = (searchTerm) => {
    setFilters((prev) => ({ ...prev, search: searchTerm }));
    setPage(1);
  };
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };
  const handleClearFilters = () => {
    setFilters({
      search: filters.search,
      genres: [],
      location: "",
      dateFrom: "",
      dateTo: "",
      instruments: [],
    });
    setPage(1);
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleEventCreated = (newEvent) => {
    mutate();
    navigate(`/events/${newEvent._id}`);
  };
  const handleViewModeChange = (event, newViewMode) => {
    if (newViewMode !== null) {
      setBaseViewMode(newViewMode);
      localStorage.setItem("jamEventsViewMode", newViewMode);
    }
  };
  const handleLike = async (eventId) => {
    if (!user) {
      showToast("Please log in to like events", "warning");
      return;
    }
    if (likingEvents.has(eventId)) return;
    const currentEvent = events.find((event) => event._id === eventId);
    const isCurrentlyLiked =
      currentEvent && currentEvent.likes?.includes(user._id);
    try {
      setLikingEvents((prev) => new Set(prev).add(eventId));
      setEvents((prevEvents) =>
        prevEvents.map((event) => {
          if (event._id === eventId) {
            const newLikes = isCurrentlyLiked
              ? event.likes.filter((id) => id !== user._id)
              : [...(event.likes || []), user._id];
            return { ...event, likes: newLikes };
          }
          return event;
        })
      );
      await api.post(`/jamEvents/${eventId}/like`);
      showToast(
        isCurrentlyLiked ? "Removed from favorites!" : "Added to favorites!",
        "success"
      );
      mutate();
    } catch (error) {
      showToast(`Failed to update like status: ${error.message}`, "error");
      setEvents((prevEvents) =>
        prevEvents.map((event) => {
          if (event._id === eventId) {
            const revertedLikes = isCurrentlyLiked
              ? [...(event.likes || []), user._id]
              : event.likes.filter((id) => id !== user._id);
            return { ...event, likes: revertedLikes };
          }
          return event;
        })
      );
    } finally {
      setLikingEvents((prev) => {
        const newSet = new Set(prev);
        newSet.delete(eventId);
        return newSet;
      });
    }
  };
  const handleMenuOpen = (event, jamEvent) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setSelectedEvent(jamEvent);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedEvent(null);
  };
  const handleViewEvent = () => {
    if (selectedEvent) {
      navigate(`/events/${selectedEvent._id}`);
    }
    handleMenuClose();
  };
  const handleEditEvent = (updatedEvent) => {
    if (updatedEvent && updatedEvent._id) {
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === updatedEvent._id ? updatedEvent : event
        )
      );
      showToast("Event updated successfully", "success");
    } else if (selectedEvent) {
      navigate(`/events/${selectedEvent._id}`);
    }
    handleMenuClose();
  };
  const handleDeleteEvent = (deletedEvent) => {
    if (deletedEvent && deletedEvent._id) {
      setEvents((prevEvents) =>
        prevEvents.filter((event) => event._id !== deletedEvent._id)
      );
      showToast("Event deleted successfully", "success");
      mutate();
    } else if (selectedEvent) {
      navigate(`/events/${selectedEvent._id}`);
    }
    handleMenuClose();
  };
  const activeFiltersCount = Object.values(filters)
    .flat()
    .filter(Boolean).length;
  return {
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
  };
};