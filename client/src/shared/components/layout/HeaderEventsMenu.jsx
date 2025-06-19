import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem } from "@mui/material";
import {
  CalendarToday,
  Event,
  RequestPage,
  Favorite,
} from "@mui/icons-material";
const HeaderEventsMenu = ({ eventsMenuAnchorEl, onEventsMenuClose, user }) => {
  const navigate = useNavigate();
  const handleMenuItemClick = (path) => {
    navigate(path);
    onEventsMenuClose();
  };
  return (
    <Menu
      anchorEl={eventsMenuAnchorEl}
      open={Boolean(eventsMenuAnchorEl)}
      onClose={onEventsMenuClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <MenuItem onClick={() => handleMenuItemClick("/events")}>
        <CalendarToday sx={{ mr: 1 }} />
        Upcoming Events
      </MenuItem>
      {user && [
        <MenuItem
          key="my-events"
          onClick={() => handleMenuItemClick("/my-events")}
        >
          <Event sx={{ mr: 1 }} />
          My Events
        </MenuItem>,
        <MenuItem
          key="my-requests"
          onClick={() => handleMenuItemClick("/my-requests")}
        >
          <RequestPage sx={{ mr: 1 }} />
          My Requests
        </MenuItem>,
        <MenuItem
          key="favorites"
          onClick={() => handleMenuItemClick("/favorites")}
        >
          <Favorite sx={{ mr: 1 }} />
          My Favorites
        </MenuItem>,
      ]}
    </Menu>
  );
};
export default HeaderEventsMenu;