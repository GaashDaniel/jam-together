import { useState, useCallback, useMemo } from "react";
export const getActiveFiltersCount = (filters) => {
  let count = 0;
  if (filters.search) count++;
  if (filters.status !== "all") count++;
  if (filters.genres.length > 0) count++;
  if (filters.dateFrom || filters.dateTo) count++;
  return count;
};
export const useFiltersLogic = (filters, onFilterChange, onClearFilters) => {
  const [showFilters, setShowFilters] = useState(false);
  const activeFiltersCount = useMemo(
    () => getActiveFiltersCount(filters),
    [filters]
  );
  const handleFilterChange = useCallback(
    (key, value) => {
      onFilterChange(key, value);
    },
    [onFilterChange]
  );
  const handleStatusChange = useCallback(
    (newStatus) => {
      handleFilterChange("status", newStatus);
    },
    [handleFilterChange]
  );
  const handleGenreChange = useCallback(
    (genres) => {
      handleFilterChange("genres", genres);
    },
    [handleFilterChange]
  );
  const handleDateChange = useCallback(
    (key, value) => {
      handleFilterChange(key, value);
    },
    [handleFilterChange]
  );
  const toggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);
  return {
    showFilters,
    setShowFilters,
    activeFiltersCount,
    handleFilterChange,
    handleStatusChange,
    handleGenreChange,
    handleDateChange,
    toggleFilters,
    clearFilters: onClearFilters,
  };
};