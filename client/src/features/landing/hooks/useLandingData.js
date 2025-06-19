import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useJamEvents } from "../../../hooks/useJamEvents";
import { useAuth } from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast";
export const useLandingData = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const eventFilters = useMemo(() => ({ limit: 3 }), []);
  const { events: fetchedEvents, isLoading } = useJamEvents(eventFilters);
  const [events, setEvents] = useState([]);
  React.useEffect(() => {
    setEvents(fetchedEvents);
  }, [fetchedEvents]);
  const handleSearch = (searchTerm) => {
    setCurrentSearchTerm(searchTerm);
    navigate(`/events?search=${encodeURIComponent(searchTerm)}`);
  };
  const handleEventCreated = (newEvent) => {
    navigate(`/events/${newEvent._id}`);
  };
  const handleCreateEventClick = () => {
    if (user) {
      setCreateEventModalOpen(true);
    } else {
      setAuthModalOpen(true);
    }
  };
  const handleBrowseEventsClick = () => {
    if (currentSearchTerm.trim()) {
      navigate(
        `/events?search=${encodeURIComponent(currentSearchTerm.trim())}`
      );
    } else {
      navigate("/events");
    }
  };
  const handleSearchClear = () => {
    setCurrentSearchTerm("");
  };
  const handleJoinNowClick = () => {
    setAuthModalOpen(true);
  };
  const handleViewAllClick = () => {
    navigate("/events");
  };
  return {
    user,
    events,
    isLoading,
    authModalOpen,
    createEventModalOpen,
    currentSearchTerm,
    setAuthModalOpen,
    setCreateEventModalOpen,
    setCurrentSearchTerm,
    handleSearch,
    handleEventCreated,
    handleCreateEventClick,
    handleBrowseEventsClick,
    handleSearchClear,
    handleJoinNowClick,
    handleViewAllClick,
  };
};