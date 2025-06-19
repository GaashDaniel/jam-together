import { useState, useEffect } from "react";
export const useMyEventsFilters = (events) => {
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    genres: [],
    dateFrom: "",
    dateTo: "",
  });
  const [filteredEvents, setFilteredEvents] = useState([]);
  useEffect(() => {
    if (!events || !Array.isArray(events)) {
      setFilteredEvents([]);
      return;
    }
    let filtered = [...events];
    if (filters.search) {
      filtered = filtered.filter(
        (event) =>
          event.title?.toLowerCase().includes(filters.search.toLowerCase()) ||
          event.content?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }
    if (filters.status !== "all") {
      const now = new Date();
      filtered = filtered.filter((event) => {
        const eventDate = new Date(event.scheduledTo);
        if (filters.status === "upcoming") {
          return eventDate >= now;
        } else if (filters.status === "past") {
          return eventDate < now;
        }
        return true;
      });
    }
    if (filters.genres && filters.genres.length > 0) {
      filtered = filtered.filter((event) =>
        event.genres?.some((genre) => filters.genres.includes(genre))
      );
    }
    if (filters.dateFrom) {
      const fromDate = new Date(filters.dateFrom);
      filtered = filtered.filter(
        (event) => new Date(event.scheduledTo) >= fromDate
      );
    }
    if (filters.dateTo) {
      const toDate = new Date(filters.dateTo);
      toDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter(
        (event) => new Date(event.scheduledTo) <= toDate
      );
    }
    setFilteredEvents(filtered);
  }, [events, filters]);
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleClearFilters = () => {
    setFilters({
      search: "",
      status: "all",
      genres: [],
      dateFrom: "",
      dateTo: "",
    });
  };
  return {
    filters,
    filteredEvents,
    handleFilterChange,
    handleClearFilters,
  };
};