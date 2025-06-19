export const LANDING_FEATURES = [
  {
    icon: "MusicNote",
    title: "Find Your Sound",
    description:
      "Discover jam sessions that match your musical style and instrument preferences",
  },
  {
    icon: "People",
    title: "Connect with Musicians",
    description:
      "Meet talented musicians in your area and collaborate on amazing music",
  },
  {
    icon: "CalendarMonth",
    title: "Organize Sessions",
    description:
      "Create and manage your own jam sessions with our easy-to-use tools",
  },
];
export const HERO_CONFIG = {
  backgroundImage:
    "url(https:
  minHeight: "70vh",
  opacity: 0.1,
};
export const createHeroButtonStyle = (theme, variant = "primary") => {
  const baseStyle = {
    px: 4,
    py: 1.5,
    borderRadius: theme.shape.borderRadius * 2,
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-2px)",
    },
  };
  switch (variant) {
    case "primary":
      return {
        ...baseStyle,
        backgroundColor: theme.palette.primary.main,
        color: "white",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        "&:hover": {
          ...baseStyle["&:hover"],
          backgroundColor: theme.palette.primary.dark,
          boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
        },
      };
    case "secondary":
      return {
        ...baseStyle,
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
        "&:hover": {
          ...baseStyle["&:hover"],
          boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
        },
      };
    case "outlined":
      return {
        ...baseStyle,
        color: "white",
        borderColor: "rgba(255,255,255,0.5)",
        backdropFilter: "blur(10px)",
        "&:hover": {
          ...baseStyle["&:hover"],
          backgroundColor: "rgba(255,255,255,0.1)",
          borderColor: "white",
        },
      };
    default:
      return baseStyle;
  }
};
export const createSearchBarStyle = (theme) => ({
  maxWidth: 600,
  mx: "auto",
  my: 4,
  backgroundColor: "rgba(255,255,255,0.15)",
  backdropFilter: "blur(15px)",
  borderRadius: theme.shape.borderRadius * 3,
  border: "1px solid rgba(255,255,255,0.2)",
  "& .MuiOutlinedInput-root": {
    "& fieldset": { border: "none" },
    "&:hover fieldset": { border: "none" },
    "&.Mui-focused fieldset": {
      border: "2px solid rgba(255,255,255,0.3)",
    },
  },
  "& .MuiInputBase-root": { color: "white" },
  "& .MuiInputBase-input::placeholder": {
    color: "rgba(255,255,255,0.8)",
    opacity: 1,
  },
  "& .MuiIconButton-root": {
    color: "white",
    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
  },
});
export const createHeroTitleStyle = () => ({
  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
  fontSize: { xs: "2.5rem", md: "3.75rem" },
});
export const createHeroSubtitleStyle = () => ({
  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
  fontSize: { xs: "1.25rem", md: "1.5rem" },
  maxWidth: 600,
  mx: "auto",
});
export const createHeroPaperStyle = (theme, isDark) => ({
  position: "relative",
  background: isDark
    ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`
    : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  color: theme.palette.primary.contrastText,
  mb: 4,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  minHeight: HERO_CONFIG.minHeight,
  display: "flex",
  alignItems: "center",
  borderRadius: 2,
  boxShadow: theme.shadows[6],
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: HERO_CONFIG.backgroundImage,
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: HERO_CONFIG.opacity,
    zIndex: 1,
  },
});
export const createFeaturesPaperStyle = (theme, isDark, getThemeColor) => ({
  p: 4,
  textAlign: "center",
  height: "100%",
  background: isDark
    ? `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[900]} 100%)`
    : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[200]} 100%)`,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 2,
  boxShadow: getThemeColor(
    "0 4px 20px rgba(0,0,0,0.1)",
    "0 4px 20px rgba(0,0,0,0.3)"
  ),
});
export const createEventHandlers = (navigate, user, setters) => ({
  handleSearch: (searchTerm) => {
    setters.setCurrentSearchTerm(searchTerm);
    navigate(`/events?search=${encodeURIComponent(searchTerm)}`);
  },
  handleEventCreated: (newEvent) => {
    navigate(`/events/${newEvent._id}`);
  },
  handleCreateEventClick: () => {
    if (user) {
      setters.setCreateEventModalOpen(true);
    } else {
      setters.setAuthModalOpen(true);
    }
  },
  handleBrowseEventsClick: (currentSearchTerm) => {
    if (currentSearchTerm.trim()) {
      navigate(
        `/events?search=${encodeURIComponent(currentSearchTerm.trim())}`
      );
    } else {
      navigate("/events");
    }
  },
  handleSearchClear: () => {
    setters.setCurrentSearchTerm("");
  },
  handleJoinNowClick: () => {
    setters.setAuthModalOpen(true);
  },
  handleViewAllClick: () => {
    navigate("/events");
  },
});