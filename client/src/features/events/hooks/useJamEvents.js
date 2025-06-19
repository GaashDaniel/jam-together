import { useState, useEffect } from "react";
import { useToast } from "./useToast";
export { useJamEvent } from "./useJamEventSingle";
export { useEventActions } from "./useEventActions";
export function useJamEvents(filters = {}) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);
  const { showToast } = useToast();
  const buildQueryString = (filterParams) => {
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
  };
  const fetchEvents = async (filterParams = {}) => {
    try {
      setIsLoading(true);
      setError(null);
      const queryString = buildQueryString(filterParams);
      const url = `/api/jamEvents${queryString ? `?${queryString}` : ""}`;
      const response = await fetch(url, { credentials: "include" });
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
      handleFetchError(err, showToast);
    } finally {
      setIsLoading(false);
    }
  };
  const refreshEvents = () => {
    fetchEvents(filters);
  };
  useEffect(() => {
    fetchEvents(filters);
  }, [JSON.stringify(filters)]); 
  return {
    events,
    isLoading,
    error,
    totalPages,
    totalEvents,
    mutate: refreshEvents,
    refetch: refreshEvents,
  };
}
export function useUserEvents(userId) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();
  const fetchUserEvents = async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/users/${userId}/events`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user events");
      }
      const data = await response.json();
      setEvents(data.events || []);
    } catch (err) {
      setError(err);
      setEvents([]);
      handleFetchError(err, showToast, "user events");
    } finally {
      setIsLoading(false);
    }
  };
  const refreshUserEvents = () => {
    fetchUserEvents();
  };
  useEffect(() => {
    fetchUserEvents();
  }, [userId]);
  return {
    events,
    isLoading,
    error,
    mutate: refreshUserEvents,
    refetch: refreshUserEvents,
  };
}
const handleFetchError = (err, showToast, context = "events") => {
  if (err.name === "TypeError" && err.message.includes("fetch")) {
    showToast("Network error - please check your connection", "error");
    return;
  }
  if (err.message.includes("401") || err.message.includes("unauthorized")) {
    showToast("Session expired - please log in again", "warning");
    return;
  }
  if (err.message.includes("403") || err.message.includes("forbidden")) {
    showToast(`Access denied to ${context}`, "error");
    return;
  }
  if (err.message.includes("404")) {
    const capitalizedContext =
      context.charAt(0).toUpperCase() + context.slice(1);
    showToast(`${capitalizedContext} not found`, "warning");
    return;
  }
  if (err.message.includes("500")) {
    showToast("Server error - please try again later", "error");
    return;
  }
  showToast(err.message || `Failed to load ${context}`, "error");
};