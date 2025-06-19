import { useState, useEffect, useCallback } from "react";
import { useToast } from "./useToast";
export function useJamEvent(eventId) {
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();
  const fetchEvent = useCallback(async () => {
    if (!eventId) {
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/jamEvents/${eventId}`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch event");
      }
      const data = await response.json();
      setEvent(data.jamEvent);
    } catch (err) {
      setError(err);
      setEvent(null);
      handleFetchError(err, showToast, "event");
    } finally {
      setIsLoading(false);
    }
  }, [eventId, showToast]);
  const mutate = useCallback(() => {
    fetchEvent();
  }, [fetchEvent]);
  useEffect(() => {
    fetchEvent();
  }, [fetchEvent]);
  return {
    event,
    isLoading,
    error,
    mutate,
    refetch: mutate,
  };
}
const handleFetchError = (err, showToast, context = "event") => {
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