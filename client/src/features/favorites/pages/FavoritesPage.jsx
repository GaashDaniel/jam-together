import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Divider, Typography } from "@mui/material";
import { useAuth } from "../../../hooks/useAuth";
import useTheme from "../../../shared/hooks/useTheme";
import { useFavorites } from "../hooks/useFavorites";
import FavoritesHeader from "../components/FavoritesHeader";
import FavoritesFilters from "../components/FavoritesFilters";
import FavoritesGrid from "../components/FavoritesGrid";
import LoadingSpinner from "../../../shared/components/ui/LoadingSpinner";
const FavoritesPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, isDark } = useTheme();
  const {
    favoriteEvents,
    filteredEvents,
    loading,
    error,
    availableGenres,
    searchQuery,
    setSearchQuery,
    selectedGenre,
    setSelectedGenre,
    showPastEvents,
    setShowPastEvents,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    handleRemoveFromFavorites,
    clearAllFilters,
    handleEditEvent,
  } = useFavorites();
  React.useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }
  }, [user, navigate]);
  const handleDeleteEvent = (event) => {
    navigate(`/events/${event._id}`);
  };
  if (!user) {
    return null;
  }
  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <LoadingSpinner />
      </Container>
    );
  }
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography color="error" align="center">
          Error loading favorite events: {error}
        </Typography>
      </Container>
    );
  }
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <FavoritesHeader
        favoriteEvents={favoriteEvents}
        filteredEvents={filteredEvents}
        availableGenres={availableGenres}
      />
      <Paper
        sx={{
          p: 3,
          mb: 4,
          background: isDark
            ? `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[900]} 100%)`
            : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[200]} 100%)`,
          border: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Divider sx={{ mb: 3 }} />
        <FavoritesFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          showPastEvents={showPastEvents}
          setShowPastEvents={setShowPastEvents}
          availableGenres={availableGenres}
          onClearFilters={clearAllFilters}
        />
      </Paper>
      <FavoritesGrid
        favoriteEvents={favoriteEvents}
        filteredEvents={filteredEvents}
        onRemoveFromFavorites={handleRemoveFromFavorites}
        onEditEvent={handleEditEvent}
        onDeleteEvent={handleDeleteEvent}
        navigate={navigate}
      />
    </Container>
  );
};
export default FavoritesPage;