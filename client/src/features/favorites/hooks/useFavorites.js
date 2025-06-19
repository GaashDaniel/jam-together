import { useState, useEffect } from "react";
import { api } from "../../../services/api";
import { useToast } from "../../../hooks/useToast";
const applyGenreFilter = (events, selectedGenre) => {
  if (!selectedGenre) return events;
  return events.filter((event) =>
    event.genres?.includes(selectedGenre.toLowerCase())
  );
};
const applySearchFilter = (events, searchQuery) => {
  if (!searchQuery) return events;
  const query = searchQuery.toLowerCase();
  return events.filter(
    (event) =>
      event.title?.toLowerCase().includes(query) ||
      event.content?.toLowerCase().includes(query) ||
      event.location?.city?.toLowerCase().includes(query) ||
      event.location?.country?.toLowerCase().includes(query)
  );
};
const applyPastEventsFilter = (events, showPastEvents) => {
  if (showPastEvents) return events;
  return events.filter((event) => !event.isPastEvent);
};
const sortEvents = (events, sortBy, sortOrder) => {
  return [...events].sort((a, b) => {
    let aValue, bValue;
    switch (sortBy) {
      case "eventDate":
        aValue = new Date(a.scheduledTo);
        bValue = new Date(b.scheduledTo);
        break;
      case "title":
        aValue = a.title?.toLowerCase() || "";
        bValue = b.title?.toLowerCase() || "";
        break;
      case "likes":
        aValue = a.likes?.length || 0;
        bValue = b.likes?.length || 0;
        break;
      case "dateAdded":
      default:
        aValue = a.dateAdded;
        bValue = b.dateAdded;
        break;
    }
    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });
};
const filterAndSortFavorites = (events, filters) => {
  const { selectedGenre, searchQuery, showPastEvents, sortBy, sortOrder } =
    filters;
  let filtered = applyGenreFilter(events, selectedGenre);
  filtered = applySearchFilter(filtered, searchQuery);
  filtered = applyPastEventsFilter(filtered, showPastEvents);
  return sortEvents(filtered, sortBy, sortOrder);
};
const extractAvailableGenres = (events) => {
  return [...new Set(events.flatMap((event) => event.genres || []))];
};
export const useFavorites = () => {
  const { showToast } = useToast();
  const [favoriteEvents, setFavoriteEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingFromFavorites, setRemovingFromFavorites] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [sortBy, setSortBy] = useState("dateAdded");
  const [sortOrder, setSortOrder] = useState("desc");
  const fetchFavoriteEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.get("/jamEvents/favorites");
      setFavoriteEvents(data.favorites || []);
    } catch (error) {
      setError(error.message);
      showToast("Failed to load favorite events", "error");
    } finally {
      setLoading(false);
    }
  };
  const handleRemoveFromFavorites = async (eventId) => {
    if (removingFromFavorites.has(eventId)) return;
    try {
      setRemovingFromFavorites((prev) => new Set(prev).add(eventId));
      await api.post(`/jamEvents/${eventId}/like`);
      setFavoriteEvents((prev) =>
        prev.filter((event) => event._id !== eventId)
      );
      showToast("Removed from favorites", "success");
    } catch (error) {
      showToast("Failed to remove from favorites", "error");
    } finally {
      setRemovingFromFavorites((prev) => {
        const newSet = new Set(prev);
        newSet.delete(eventId);
        return newSet;
      });
    }
  };
  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedGenre("");
    setShowPastEvents(false);
    setSortBy("dateAdded");
    setSortOrder("desc");
  };
  const handleEditEvent = (updatedEvent) => {
    setFavoriteEvents((prev) =>
      prev.map((event) =>
        event._id === updatedEvent._id ? { ...event, ...updatedEvent } : event
      )
    );
    showToast("Event updated successfully!", "success");
  };
  const availableGenres = extractAvailableGenres(favoriteEvents);
  useEffect(() => {
    fetchFavoriteEvents();
  }, []);
  useEffect(() => {
    const filters = {
      selectedGenre,
      searchQuery,
      showPastEvents,
      sortBy,
      sortOrder,
    };
    const filtered = filterAndSortFavorites(favoriteEvents, filters);
    setFilteredEvents(filtered);
  }, [
    favoriteEvents,
    sortBy,
    sortOrder,
    selectedGenre,
    searchQuery,
    showPastEvents,
  ]);
  return {
    favoriteEvents,
    filteredEvents,
    loading,
    error,
    availableGenres,
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    showPastEvents,
    setShowPastEvents,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    handleRemoveFromFavorites,
    clearAllFilters,
    handleEditEvent,
  };
};