import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Event } from "@mui/icons-material";
import JamEventCard from "../../events/components/JamEventCard";
const UserEventsGrid = ({ user, userEvents, isOwnProfile }) => (
  <Box>
    <Typography variant="h6" gutterBottom>
      Events Created by {user.fullName || user.username}
    </Typography>
    {userEvents.length > 0 ? (
      <Grid container spacing={3}>
        {userEvents.map((event) => (
          <Grid size={{ xs: 12, sm: 6 }} key={event._id}>
            <JamEventCard jamEvent={event} />
          </Grid>
        ))}
      </Grid>
    ) : (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Event sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No events created yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {isOwnProfile
            ? "You haven't created any events yet. Start jamming!"
            : `${user.username} hasn't created any events yet.`}
        </Typography>
      </Box>
    )}
  </Box>
);
export default UserEventsGrid;