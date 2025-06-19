import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import ThemeContext from "../contexts/ThemeContext";
export const useHeaderNavigation = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { mode, toggleColorMode } = useContext(ThemeContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [eventsMenuAnchorEl, setEventsMenuAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login");
  const [createEventModalOpen, setCreateEventModalOpen] = useState(false);
  const [mobileEventsExpanded, setMobileEventsExpanded] = useState(false);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleEventsMenuOpen = (event) => {
    setEventsMenuAnchorEl(event.currentTarget);
  };
  const handleEventsMenuClose = () => {
    setEventsMenuAnchorEl(null);
  };
  const handleDrawerToggle = () => {
    if (mobileOpen) {
      setMobileEventsExpanded(false);
    }
    setMobileOpen(!mobileOpen);
  };
  const handleMobileEventsToggle = () => {
    setMobileEventsExpanded(!mobileEventsExpanded);
  };
  const handleLogout = async () => {
    await logout();
    handleMenuClose();
    navigate("/");
  };
  const openAuthModal = (mode) => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };
  const handleCreateEventClick = () => {
    setCreateEventModalOpen(true);
  };
  const handleEventCreated = (newEvent) => {
    setCreateEventModalOpen(false);
    navigate(`/events/${newEvent._id}`);
  };
  return {
    user,
    mode,
    anchorEl,
    eventsMenuAnchorEl,
    mobileOpen,
    authModalOpen,
    authModalMode,
    createEventModalOpen,
    mobileEventsExpanded,
    toggleColorMode,
    handleProfileMenuOpen,
    handleMenuClose,
    handleEventsMenuOpen,
    handleEventsMenuClose,
    handleDrawerToggle,
    handleMobileEventsToggle,
    handleLogout,
    openAuthModal,
    handleCreateEventClick,
    handleEventCreated,
    setAuthModalOpen,
    setCreateEventModalOpen,
  };
};