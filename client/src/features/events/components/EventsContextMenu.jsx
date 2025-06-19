import React from "react";
import { Menu, MenuItem } from "@mui/material";
import { Visibility, Edit, Delete } from "@mui/icons-material";
const EventsContextMenu = ({
  anchorEl,
  open,
  onClose,
  onViewEvent,
  onEditEvent,
  onDeleteEvent,
}) => (
  <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
    <MenuItem onClick={onViewEvent}>
      <Visibility sx={{ mr: 1 }} />
      View Event
    </MenuItem>
    <MenuItem onClick={onEditEvent}>
      <Edit sx={{ mr: 1 }} />
      Edit Event
    </MenuItem>
    <MenuItem onClick={onDeleteEvent}>
      <Delete sx={{ mr: 1 }} />
      Delete Event
    </MenuItem>
  </Menu>
);
export default EventsContextMenu;