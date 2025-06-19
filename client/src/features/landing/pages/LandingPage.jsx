import React from "react";
import { Box } from "@mui/material";
import { useLandingData } from "../hooks/useLandingData";
import useTheme from "../../../shared/hooks/useTheme";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import EventsPreview from "../components/EventsPreview";
import CreateEventModal from "../../events/components/CreateEventModal";
import AuthModal from "../../auth/components/AuthModal";
const LandingPage = () => {
  const { theme, isDark, getThemeColor } = useTheme();
  const {
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
  } = useLandingData();
  return (
    <Box>
      <HeroSection
        user={user}
        theme={theme}
        isDark={isDark}
        currentSearchTerm={currentSearchTerm}
        onSearch={handleSearch}
        onSearchChange={setCurrentSearchTerm}
        onSearchClear={handleSearchClear}
        onBrowseEventsClick={handleBrowseEventsClick}
        onCreateEventClick={handleCreateEventClick}
        onJoinNowClick={handleJoinNowClick}
      />
      <FeaturesSection
        theme={theme}
        isDark={isDark}
        getThemeColor={getThemeColor}
      />
      <EventsPreview
        events={events}
        isLoading={isLoading}
        theme={theme}
        getThemeColor={getThemeColor}
        onViewAllClick={handleViewAllClick}
      />
      <CreateEventModal
        open={createEventModalOpen}
        onClose={() => setCreateEventModalOpen(false)}
        onSuccess={handleEventCreated}
      />
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </Box>
  );
};
export default LandingPage;