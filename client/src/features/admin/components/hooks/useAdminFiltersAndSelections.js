import { useState, useEffect } from "react";
export const useAdminFiltersAndSelections = (users = [], events = []) => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [selectedEvents, setSelectedEvents] = useState(new Set());
  const [filters, setFilters] = useState({
    users: {
      search: "",
      role: "all",
      status: "all",
      dateFrom: "",
      dateTo: "",
    },
    events: {
      search: "",
      status: "all",
      dateFrom: "",
      dateTo: "",
    },
  });
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setSelectedUsers(new Set());
    setSelectedEvents(new Set());
  };
  const handleFilterChange = (section, key, value) => {
    setFilters((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };
  const handleUserSelection = (userId, clearAll = false) => {
    if (clearAll) {
      setSelectedUsers(new Set());
      return;
    }
    const newSelection = new Set(selectedUsers);
    if (newSelection.has(userId)) {
      newSelection.delete(userId);
    } else {
      newSelection.add(userId);
    }
    setSelectedUsers(newSelection);
  };
  const handleSelectAllUsers = () => {
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredUsers.map((user) => user._id)));
    }
  };
  const handleEventSelection = (eventId, clearAll = false) => {
    if (clearAll) {
      setSelectedEvents(new Set());
      return;
    }
    const newSelection = new Set(selectedEvents);
    if (newSelection.has(eventId)) {
      newSelection.delete(eventId);
    } else {
      newSelection.add(eventId);
    }
    setSelectedEvents(newSelection);
  };
  const handleSelectAllEvents = () => {
    if (selectedEvents.size === filteredEvents.length) {
      setSelectedEvents(new Set());
    } else {
      setSelectedEvents(new Set(filteredEvents.map((event) => event._id)));
    }
  };
  const clearAllSelections = () => {
    setSelectedUsers(new Set());
    setSelectedEvents(new Set());
  };
  useEffect(() => {
    let filteredUserList = [...users];
    if (filters.users.search) {
      const searchTerm = filters.users.search.toLowerCase();
      filteredUserList = filteredUserList.filter(
        (user) =>
          user.fullName?.toLowerCase().includes(searchTerm) ||
          user.username?.toLowerCase().includes(searchTerm) ||
          user.email?.toLowerCase().includes(searchTerm)
      );
    }
    if (filters.users.role !== "all") {
      filteredUserList = filteredUserList.filter(
        (user) => user.role === filters.users.role
      );
    }
    if (filters.users.status !== "all") {
      filteredUserList = filteredUserList.filter(
        (user) => user.status === filters.users.status
      );
    }
    setFilteredUsers(filteredUserList);
    let filteredEventList = [...events];
    if (filters.events.search) {
      const searchTerm = filters.events.search.toLowerCase();
      filteredEventList = filteredEventList.filter(
        (event) =>
          event.title?.toLowerCase().includes(searchTerm) ||
          event.content?.toLowerCase().includes(searchTerm) ||
          event.location?.city?.toLowerCase().includes(searchTerm) ||
          event.location?.country?.toLowerCase().includes(searchTerm) ||
          event.createdBy?.username?.toLowerCase().includes(searchTerm)
      );
    }
    if (filters.events.status !== "all") {
      filteredEventList = filteredEventList.filter(
        (event) => event.status === filters.events.status
      );
    }
    setFilteredEvents(filteredEventList);
  }, [users, events, filters]);
  return {
    tabValue,
    handleTabChange,
    filters,
    filteredUsers,
    filteredEvents,
    handleFilterChange,
    selectedUsers,
    selectedEvents,
    handleUserSelection,
    handleEventSelection,
    handleSelectAllUsers,
    handleSelectAllEvents,
    clearAllSelections,
  };
};