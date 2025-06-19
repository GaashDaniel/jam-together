import { useState, useEffect, useCallback } from "react";
import { useToast } from "./useToast";
export function useUserEvents(userId) {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();
  const fetchUserEvents = useCallback(async () => {
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
  }, [userId, showToast]);
  const mutate = useCallback(() => {
    fetchUserEvents();
  }, [fetchUserEvents]);
  useEffect(() => {
    fetchUserEvents();
  }, [fetchUserEvents]);
  return {
    events,
    isLoading,
    error,
    mutate,
    refetch: mutate,
  };
}
const handleFetchError = (err, showToast, context = "user events") => {
  if (err.name === "TypeError" && err.message.includes("fetch")) {
    showToast("Network error - please check your connection", "error");
  } else if (
    err.message.includes("401") ||
    err.message.includes("unauthorized")
  ) {
    showToast("Session expired - please log in again", "warning");
  } else if (err.message.includes("403") || err.message.includes("forbidden")) {
    showToast(`Access denied to ${context}`, "error");
  } else if (err.message.includes("404")) {
    showToast(
      `${context.charAt(0).toUpperCase() + context.slice(1)} not found`,
      "warning"
    );
  } else if (err.message.includes("500")) {
    showToast("Server error - please try again later", "error");
  } else {
    showToast(err.message || `Failed to load ${context}`, "error");
  }
};