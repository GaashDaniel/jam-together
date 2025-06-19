import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
} from "@mui/material";
import { Favorite, Star } from "@mui/icons-material";
const MostLikedEventsChart = React.memo(({ mostLikedEvents, paperSx }) => (
  <Paper sx={paperSx}>
    <Typography
      variant="h6"
      gutterBottom
      sx={{ display: "flex", alignItems: "center", gap: 1 }}
    >
      <Favorite color="error" />
      Most Liked Events
    </Typography>
    <List>
      {mostLikedEvents.slice(0, 5).map((event, index) => (
        <ListItem key={event._id} divider={index < 4}>
          <ListItemIcon>
            <Star color={index === 0 ? "warning" : "action"} />
          </ListItemIcon>
          <ListItemText
            primary={event.title}
            secondary={`By ${event.creator} • ${event.likesCount} likes`}
          />
          <Chip
            label={event.likesCount}
            color="error"
            size="small"
            variant="outlined"
          />
        </ListItem>
      ))}
    </List>
  </Paper>
));
MostLikedEventsChart.displayName = "MostLikedEventsChart";
export default MostLikedEventsChart;