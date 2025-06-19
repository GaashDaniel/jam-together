import { useCallback } from "react";
import { useToast } from "../../../shared/hooks/useToast";
export function useEventActions() {
  const { showToast } = useToast();
  const likeEvent = useCallback(
    async (eventId) => {
      try {
        const response = await fetch(`/api/jamEvents/${eventId}/like`, {
          method: "POST",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error("Failed to like event");
        }
        const data = await response.json();
        showToast("Event liked!", "success");
        return data;
      } catch (error) {
        showToast("Failed to like event", "error");
        throw error;
      }
    },
    [showToast]
  );
  const joinEvent = useCallback(
    async (eventId, joinData) => {
      try {
        const response = await fetch(`/api/jamEvents/${eventId}/join`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(joinData),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to join event");
        }
        const data = await response.json();
        showToast("Join request submitted!", "success");
        return data;
      } catch (error) {
        showToast(error.message, "error");
        throw error;
      }
    },
    [showToast]
  );
  const createEvent = useCallback(
    async (eventData) => {
      try {
        const response = await fetch("/api/jamEvents", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(eventData),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to create event");
        }
        const data = await response.json();
        showToast("Event created successfully!", "success");
        return data;
      } catch (error) {
        showToast(error.message, "error");
        throw error;
      }
    },
    [showToast]
  );
  const updateEvent = useCallback(
    async (eventId, eventData) => {
      try {
        const response = await fetch(`/api/jamEvents/${eventId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(eventData),
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to update event");
        }
        const data = await response.json();
        showToast("Event updated successfully!", "success");
        return data;
      } catch (error) {
        showToast(error.message, "error");
        throw error;
      }
    },
    [showToast]
  );
  const deleteEvent = useCallback(
    async (eventId) => {
      try {
        const response = await fetch(`/api/jamEvents/${eventId}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to delete event");
        }
        showToast("Event deleted successfully!", "success");
        return true;
      } catch (error) {
        showToast(error.message, "error");
        throw error;
      }
    },
    [showToast]
  );
  return {
    likeEvent,
    joinEvent,
    createEvent,
    updateEvent,
    deleteEvent,
  };
}