import { useState } from "react";
export const useSimpleFilters = (initialFilters = {}) => {
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    genres: [],
    dateFrom: "",
    dateTo: "",
    ...initialFilters,
  });
  const [showFilters, setShowFilters] = useState(false);
  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.status !== "all") count++;
    if (filters.genres && filters.genres.length > 0) count++;
    if (filters.dateFrom || filters.dateTo) count++;
    return count;
  };
  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const updateFilters = (newFilters) => {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  };
  const clearFilters = (preserveSearch = false) => {
    setFilters({
      search: preserveSearch ? filters.search : "",
      status: "all",
      genres: [],
      dateFrom: "",
      dateTo: "",
      ...initialFilters,
    });
  };
  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };
  const handleSearchChange = (searchTerm) => {
    updateFilter("search", searchTerm);
  };
  const handleStatusChange = (newStatus) => {
    updateFilter("status", newStatus);
  };
  const handleGenreChange = (genres) => {
    updateFilter("genres", genres);
  };
  const handleDateChange = (key, value) => {
    updateFilter(key, value);
  };
  return {
    filters,
    showFilters,
    activeFiltersCount: getActiveFiltersCount(),
    updateFilter,
    updateFilters,
    clearFilters,
    toggleFilters,
    setShowFilters,
    handleSearchChange,
    handleStatusChange,
    handleGenreChange,
    handleDateChange,
  };
};
export const useFilteredItems = (items = [], filters = {}) => {
  if (!items || items.length === 0) return [];
  return items.filter((item) => {
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchableFields = [
        item.title,
        item.name,
        item.fullName,
        item.username,
        item.email,
        item.content,
        item.description,
        item.location?.city,
        item.location?.country,
        item.createdBy?.username,
      ];
      const matchesSearch = searchableFields.some((field) =>
        field?.toLowerCase().includes(searchTerm)
      );
      if (!matchesSearch) return false;
    }
    if (filters.status && filters.status !== "all") {
      if (item.status !== filters.status) return false;
    }
    if (filters.genres && filters.genres.length > 0) {
      if (
        !item.genres ||
        !item.genres.some((genre) => filters.genres.includes(genre))
      ) {
        return false;
      }
    }
    if (filters.dateFrom || filters.dateTo) {
      const itemDate = new Date(
        item.scheduledTo || item.createdAt || item.date
      );
      if (filters.dateFrom && itemDate < new Date(filters.dateFrom)) {
        return false;
      }
      if (filters.dateTo && itemDate > new Date(filters.dateTo)) {
        return false;
      }
    }
    return true;
  });
};
export default useSimpleFilters;