import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  Collapse,
  ListItemIcon,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  CalendarToday,
  Event,
  RequestPage,
  Favorite,
} from "@mui/icons-material";
const HeaderMobileDrawer = ({
  mobileOpen,
  onDrawerToggle,
  mobileEventsExpanded,
  onMobileEventsToggle,
  user,
  onCreateEventClick,
  onOpenAuthModal,
  isMobile,
}) => {
  const drawer = (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        JamTogether
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/"
            onClick={onDrawerToggle}
          >
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={onMobileEventsToggle}>
            <ListItemText primary="Events" />
            {mobileEventsExpanded ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
        </ListItem>
        <Collapse in={mobileEventsExpanded} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem disablePadding>
              <ListItemButton
                component={RouterLink}
                to="/events"
                sx={{ pl: 4 }}
                onClick={onDrawerToggle}
              >
                <ListItemIcon>
                  <CalendarToday />
                </ListItemIcon>
                <ListItemText primary="Upcoming Events" />
              </ListItemButton>
            </ListItem>
            {user && [
              <ListItem key="my-events" disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/my-events"
                  sx={{ pl: 4 }}
                  onClick={onDrawerToggle}
                >
                  <ListItemIcon>
                    <Event />
                  </ListItemIcon>
                  <ListItemText primary="My Events" />
                </ListItemButton>
              </ListItem>,
              <ListItem key="my-requests" disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/my-requests"
                  sx={{ pl: 4 }}
                  onClick={onDrawerToggle}
                >
                  <ListItemIcon>
                    <RequestPage />
                  </ListItemIcon>
                  <ListItemText primary="My Requests" />
                </ListItemButton>
              </ListItem>,
              <ListItem key="favorites" disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/favorites"
                  sx={{ pl: 4 }}
                  onClick={onDrawerToggle}
                >
                  <ListItemIcon>
                    <Favorite />
                  </ListItemIcon>
                  <ListItemText primary="My Favorites" />
                </ListItemButton>
              </ListItem>,
            ]}
          </List>
        </Collapse>
        <ListItem disablePadding>
          <ListItemButton
            component={RouterLink}
            to="/about"
            onClick={onDrawerToggle}
          >
            <ListItemText primary="About" />
          </ListItemButton>
        </ListItem>
        {user ? (
          <>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  onCreateEventClick();
                  onDrawerToggle();
                }}
              >
                <ListItemText primary="Create Event" />
              </ListItemButton>
            </ListItem>
            {user.role === "admin" && (
              <ListItem disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to="/admin"
                  onClick={onDrawerToggle}
                >
                  <ListItemText primary="Admin" />
                </ListItemButton>
              </ListItem>
            )}
          </>
        ) : (
          <>
            <Divider />
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  onOpenAuthModal("login");
                  onDrawerToggle();
                }}
              >
                <ListItemText primary="Login" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  onOpenAuthModal("register");
                  onDrawerToggle();
                }}
              >
                <ListItemText primary="Register" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );
  return (
    <Drawer
      variant="temporary"
      open={mobileOpen}
      onClose={onDrawerToggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        display: isMobile ? "block" : "none",
        "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
      }}
    >
      {drawer}
    </Drawer>
  );
};
export default HeaderMobileDrawer;