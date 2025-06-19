import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Brightness4,
  Brightness7,
  MusicNote,
} from "@mui/icons-material";
import { useHeaderNavigation } from "../../hooks/useHeaderNavigation";
import AuthModal from "../Auth/AuthModal";
import CreateEventModal from "../JamEvent/CreateEventModal";
import HeaderMobileDrawer from "./HeaderMobileDrawer";
import HeaderDesktopNavigation from "./HeaderDesktopNavigation";
import HeaderUserMenu from "./HeaderUserMenu";
import HeaderEventsMenu from "./HeaderEventsMenu";
export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width: 800px)");
  const {
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
  } = useHeaderNavigation();
  return (
    <>
      <AppBar position="sticky">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <MusicNote sx={{ mr: 1 }} />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: isMobile ? 1 : 0,
              textDecoration: "none",
              color: "inherit",
              mr: 4,
            }}
          >
            JamTogether
          </Typography>
          {!isMobile && (
            <HeaderDesktopNavigation
              user={user}
              onEventsMenuOpen={handleEventsMenuOpen}
              onCreateEventClick={handleCreateEventClick}
            />
          )}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip
              title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
            >
              <IconButton onClick={toggleColorMode} color="inherit">
                {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
            </Tooltip>
            <HeaderUserMenu
              user={user}
              anchorEl={anchorEl}
              onMenuClose={handleMenuClose}
              onProfileMenuOpen={handleProfileMenuOpen}
              onLogout={handleLogout}
              onOpenAuthModal={openAuthModal}
              isMobile={isMobile}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <HeaderMobileDrawer
        mobileOpen={mobileOpen}
        onDrawerToggle={handleDrawerToggle}
        mobileEventsExpanded={mobileEventsExpanded}
        onMobileEventsToggle={handleMobileEventsToggle}
        user={user}
        onCreateEventClick={handleCreateEventClick}
        onOpenAuthModal={openAuthModal}
        isMobile={isMobile}
      />
      <HeaderEventsMenu
        eventsMenuAnchorEl={eventsMenuAnchorEl}
        onEventsMenuClose={handleEventsMenuClose}
        user={user}
      />
      <AuthModal
        open={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />
      <CreateEventModal
        open={createEventModalOpen}
        onClose={() => setCreateEventModalOpen(false)}
        onEventCreated={handleEventCreated}
      />
    </>
  );
}
