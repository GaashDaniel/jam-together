import { useState, useEffect } from "react";
export const useEventFilters = (filters, onFilterChange) => {
  const [locationInput, setLocationInput] = useState(filters.location);
  const [dateError, setDateError] = useState("");
  useEffect(() => {
    setLocationInput(filters.location);
  }, [filters.location]);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (locationInput !== filters.location) {
        onFilterChange({
          ...filters,
          location: locationInput,
        });
      }
    }, 300); 
    return () => clearTimeout(timeoutId);
  }, [locationInput, filters, onFilterChange]);
  const handleGenreChange = (event) => {
    const value = event.target.value;
    onFilterChange({
      ...filters,
      genres: typeof value === "string" ? value.split(",") : value,
    });
  };
  const handleInstrumentChange = (event) => {
    const value = event.target.value;
    onFilterChange({
      ...filters,
      instruments: typeof value === "string" ? value.split(",") : value,
    });
  };
  const handleLocationInputChange = (event) => {
    setLocationInput(event.target.value);
  };
  const handleDateFromChange = (date) => {
    const newDateFrom = date ? date.toLocaleDateString("en-CA") : "";
    setDateError("");
    if (
      newDateFrom &&
      filters.dateTo &&
      new Date(newDateFrom) > new Date(filters.dateTo)
    ) {
      onFilterChange({
        ...filters,
        dateFrom: newDateFrom,
        dateTo: "", 
      });
    } else {
      onFilterChange({
        ...filters,
        dateFrom: newDateFrom,
      });
    }
  };
  const handleDateToChange = (date) => {
    const newDateTo = date ? date.toLocaleDateString("en-CA") : "";
    if (
      newDateTo &&
      filters.dateFrom &&
      new Date(newDateTo) < new Date(filters.dateFrom)
    ) {
      setDateError("End date cannot be before start date");
      return;
    }
    setDateError("");
    onFilterChange({
      ...filters,
      dateTo: newDateTo,
    });
  };
  const handleClearFilters = () => {
    setLocationInput(""); 
    setDateError(""); 
    onFilterChange({
      search: filters.search, 
      genres: [],
      location: "",
      dateFrom: "",
      dateTo: "",
      instruments: [],
    });
  };
  const removeGenre = (genreToRemove) => {
    onFilterChange({
      ...filters,
      genres: filters.genres.filter((genre) => genre !== genreToRemove),
    });
  };
  const removeInstrument = (instrumentToRemove) => {
    onFilterChange({
      ...filters,
      instruments: filters.instruments.filter(
        (instrument) => instrument !== instrumentToRemove
      ),
    });
  };
  return {
    locationInput,
    dateError,
    handlers: {
      handleGenreChange,
      handleInstrumentChange,
      handleLocationInputChange,
      handleDateFromChange,
      handleDateToChange,
      handleClearFilters,
      removeGenre,
      removeInstrument,
    },
  };
};