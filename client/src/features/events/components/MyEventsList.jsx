import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Paper,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Box,
  Typography,
  Stack,
  Chip,
  IconButton,
  Badge,
  Tooltip,
  Divider,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Edit,
  Delete,
  Visibility,
  MoreVert,
  CalendarToday,
  LocationOn,
  Person,
  Favorite,
  FavoriteBorder,
  Comment,
} from "@mui/icons-material";
import JamEventCard from "./JamEventCard";
import { formatDateTime, getInitials } from "../../utils/formatters";
import useTheme from "../../../shared/hooks/useTheme";
export default function MyEventsList({
  events,
  viewMode,
  user,
  likingEvents,
  onLike,
  onEdit,
  onDelete,
  menuAnchorEl,
  selectedEvent,
  onMenuOpen,
  onMenuClose,
}) {
  const navigate = useNavigate();
  const { theme, isDark, getThemeColor, getTextColor } = useTheme();
  if (events.length === 0)
    return (
      <Paper sx={{ p: 6, textAlign: "center" }}>
        <Typography variant="h6">No events found</Typography>
      </Paper>
    );
  return (
    <>
      {viewMode === "grid" ? (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={event._id}>
              <JamEventCard
                jamEvent={event}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Paper>
          <List>
            {events.map((event) => (
              <ListItem key={event._id}>
                <Typography>{event.title}</Typography>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </>
  );
}
