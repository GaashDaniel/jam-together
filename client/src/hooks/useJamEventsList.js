import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useToast } from "./useToast";
export function useJamEvents(filters = {}) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const { showToast } = useToast();
  const isFetchingRef = useRef(false);
  const lastFetchTimeRef = useRef(0);
  const lastFiltersRef = useRef("");
  const memoizedFilters = useMemo(() => filters, [JSON.stringify(filters)]);
  const buildQueryString = useCallback((filterParams) => {
    const params = new URLSearchParams();
    Object.entries(filterParams).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        if (Array.isArray(value)) {
          value.forEach((item) => {
            if (item) params.append(key, item);
          });
        } else {
          params.set(key, value);
        }
      }
    });
    return params.toString();
  }, []);
  const fetchEvents = useCallback(
    async (filterParams = {}) => {
      const currentTime = Date.now();
      const filtersString = JSON.stringify(filterParams);
      if (
        isFetchingRef.current ||
        currentTime - lastFetchTimeRef.current < 150 ||
        (filtersString === lastFiltersRef.current &&
          lastFetchTimeRef.current > 0)
      ) {
        return;
      }
      isFetchingRef.current = true;
      lastFetchTimeRef.current = currentTime;
      lastFiltersRef.current = filtersString;
      try {
        setIsLoading(true);
        setError(null);
        const queryString = buildQueryString(filterParams);
        const url = `/api/jamEvents${queryString ? `?${queryString}` : ""}`;
        const response = await fetch(url, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data.jamEvents || []);
        setTotalPages(data.pagination?.totalPages || 0);
        setTotalEvents(data.pagination?.total || 0);
      } catch (err) {
        setError(err);
        setEvents([]);
        setTotalPages(0);
        setTotalEvents(0);
        if (err.name === "TypeError" && err.message.includes("fetch")) {
          showToast("Network error - please check your connection", "error");
        } else if (
          err.message.includes("401") ||
          err.message.includes("unauthorized")
        ) {
          showToast("Session expired - please log in again", "warning");
        } else if (
          err.message.includes("403") ||
          err.message.includes("forbidden")
        ) {
          showToast("Access denied - insufficient permissions", "error");
        } else if (err.message.includes("404")) {
          showToast("Events not found", "warning");
        } else if (err.message.includes("500")) {
          showToast("Server error - please try again later", "error");
        } else {
          showToast(err.message || "Failed to load events", "error");
        }
      } finally {
        setIsLoading(false);
        isFetchingRef.current = false;
      }
    },
    [buildQueryString, showToast]
  );
  const mutate = useCallback(() => {
    fetchEvents(memoizedFilters);
  }, [fetchEvents, memoizedFilters]);
  useEffect(() => {
    fetchEvents(memoizedFilters);
  }, [fetchEvents, memoizedFilters]);
  return {
    events,
    isLoading,
    error,
    totalPages,
    totalEvents,
    mutate,
    refetch: mutate,
  };
}