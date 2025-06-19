import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button } from "@mui/material";
import { Home, Info, Add, MusicNote, ExpandMore } from "@mui/icons-material";
const HeaderDesktopNavigation = ({
  user,
  onEventsMenuOpen,
  onCreateEventClick,
}) => {
  return (
    <Box sx={{ flexGrow: 1, display: "flex", gap: 2 }}>
      <Button
        color="inherit"
        component={RouterLink}
        to="/"
        startIcon={<Home />}
      >
        Home
      </Button>
      <Button
        color="inherit"
        onClick={onEventsMenuOpen}
        startIcon={<MusicNote />}
        endIcon={<ExpandMore />}
        sx={{ textTransform: "none" }}
      >
        Events
      </Button>
      <Button
        color="inherit"
        component={RouterLink}
        to="/about"
        startIcon={<Info />}
      >
        About
      </Button>
      {user && (
        <Button
          color="inherit"
          onClick={onCreateEventClick}
          startIcon={<Add />}
        >
          Create Event
        </Button>
      )}
    </Box>
  );
};
export default HeaderDesktopNavigation;