import { useState, useEffect, useCallback } from "react";
import { useAuth } from "./useAuth";
import { useToast } from "./useToast";
import { api } from "../services/api";
export const useMyEvents = () => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [likingEvents, setLikingEvents] = useState(new Set());
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.get("/users/me/events");
      setEvents(data?.events || []);
    } catch (err) {
      const errorMessage = err.message || "Failed to load events";
      setError(errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  }, [showToast]);
  const refreshEvents = useCallback(async () => {
    try {
      const data = await api.get("/users/me/events");
      setEvents(data?.events || []);
      showToast("Events refreshed", "success");
    } catch (err) {
      showToast(err.message || "Failed to refresh events", "error");
    }
  }, [showToast]);
  const refreshEventsQuietly = useCallback(async () => {
    try {
      const data = await api.get("/users/me/events");
      setEvents(data?.events || []);
    } catch (err) {}
  }, []);
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);
  const handleEventCreated = async () => {
    try {
      const data = await api.get("/users/me/events");
      setEvents(data.events || []);
      showToast("Event created successfully!", "success");
    } catch (err) {
      console.error("Failed to refresh events:", err);
    }
  };
  const handleEventUpdated = async (updatedEvent) => {
    try {
      const data = await api.get("/users/me/events");
      setEvents(data.events || []);
    } catch (err) {
      console.error("Failed to refresh events:", err);
    }
  };
  const handleDeleteEvent = async (eventToDelete) => {
    try {
      await api.delete(`/jamEvents/${eventToDelete._id}`);
      setEvents(events.filter((event) => event._id !== eventToDelete._id));
      showToast("Event deleted successfully", "success");
      return true;
    } catch (err) {
      showToast("Failed to delete event", "error");
      return false;
    }
  };
  const handleLike = async (eventId) => {
    if (!user) {
      showToast("Please log in to like events", "warning");
      return;
    }
    if (likingEvents.has(eventId)) return;
    const currentEvent = events.find((event) => event._id === eventId);
    const isCurrentlyLiked =
      currentEvent && currentEvent.likes?.includes(user._id);
    try {
      setLikingEvents((prev) => new Set(prev).add(eventId));
      setEvents((prevEvents) =>
        prevEvents.map((event) => {
          if (event._id === eventId) {
            const newLikes = isCurrentlyLiked
              ? event.likes.filter((id) => id !== user._id)
              : [...(event.likes || []), user._id];
            return { ...event, likes: newLikes };
          }
          return event;
        })
      );
      await api.post(`/jamEvents/${eventId}/like`);
      showToast(
        isCurrentlyLiked ? "Removed from favorites!" : "Added to favorites!",
        "success"
      );
    } catch (error) {
      showToast(`Failed to update like status: ${error.message}`, "error");
      setEvents((prevEvents) =>
        prevEvents.map((event) => {
          if (event._id === eventId) {
            const revertedLikes = isCurrentlyLiked
              ? [...(event.likes || []), user._id]
              : event.likes.filter((id) => id !== user._id);
            return { ...event, likes: revertedLikes };
          }
          return event;
        })
      );
    } finally {
      setLikingEvents((prev) => {
        const newSet = new Set(prev);
        newSet.delete(eventId);
        return newSet;
      });
    }
  };
  return {
    events,
    loading,
    error,
    likingEvents,
    handleEventCreated,
    handleEventUpdated,
    handleDeleteEvent,
    handleLike,
    refreshEvents,
    refreshEventsQuietly,
    refetch: fetchEvents,
  };
};
