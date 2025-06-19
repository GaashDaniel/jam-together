import { useState, useMemo, useCallback } from "react";
export const useSimpleFilters = (options = {}) => {
  const initialFilters = {
    search: "",
    dateFrom: null,
    dateTo: null,
    genre: "",
    city: "",
    location: "",
    status: "all",
    isMyEvents: false,
    sortBy: "newest",
  };
  const [filters, setFilters] = useState({
    ...initialFilters,
    ...options.initialFilters,
  });
  const resetFilters = useCallback(() => {
    setFilters({
      ...initialFilters,
      ...options.initialFilters,
    });
  }, [options.initialFilters]);
  const updateFilter = useCallback((field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);
  const updateFilters = useCallback((updates) => {
    setFilters((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);
  const toggleFilter = useCallback((field) => {
    setFilters((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }, []);
  const hasActiveFilters = useMemo(() => {
    return Object.entries(filters).some(([key, value]) => {
      const defaultValue = initialFilters[key];
      if (value !== defaultValue) {
        if (typeof value === "string") return value.length > 0;
        if (value === null || value === undefined) return false;
        return true;
      }
      return false;
    });
  }, [filters]);
  const activeFilterCount = useMemo(() => {
    return Object.entries(filters).reduce((count, [key, value]) => {
      const defaultValue = initialFilters[key];
      if (value !== defaultValue) {
        if (typeof value === "string" && value.length > 0) return count + 1;
        if (value !== null && value !== undefined) return count + 1;
      }
      return count;
    }, 0);
  }, [filters]);
  const getFilterSummary = useCallback(() => {
    const summary = [];
    Object.entries(filters).forEach(([key, value]) => {
      const defaultValue = initialFilters[key];
      if (value !== defaultValue && value) {
        summary.push(`${key}: ${value}`);
      }
    });
    return summary.join(", ");
  }, [filters]);
  return {
    filters,
    setFilters,
    updateFilter,
    updateFilters,
    resetFilters,
    toggleFilter,
    handleSearchChange: (value) => updateFilter("search", value),
    handleDateFromChange: (value) => updateFilter("dateFrom", value),
    handleDateToChange: (value) => updateFilter("dateTo", value),
    handleGenreChange: (value) => updateFilter("genre", value),
    handleCityChange: (value) => updateFilter("city", value),
    handleLocationChange: (value) => updateFilter("location", value),
    handleStatusChange: (value) => updateFilter("status", value),
    handleSortChange: (value) => updateFilter("sortBy", value),
    hasActiveFilters,
    activeFilterCount,
    getFilterSummary,
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