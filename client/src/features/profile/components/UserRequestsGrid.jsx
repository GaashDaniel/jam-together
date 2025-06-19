import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import { Group } from "@mui/icons-material";
import UnifiedEventCard from "../../../components/JamEvent/UnifiedEventCard";
const UserRequestsGrid = ({
  joinRequests,
  onCancelClick,
  cancellingRequestId,
}) => (
  <Box>
    <Typography variant="h6" gutterBottom>
      My Join Requests
    </Typography>
    {joinRequests.length > 0 ? (
      <Grid container spacing={3}>
        {joinRequests.map((request) => (
          <Grid size={{ xs: 12, sm: 6 }} key={request._id}>
            <UnifiedEventCard
              joinRequest={request}
              type="request"
              onCancel={onCancelClick}
              isLoading={cancellingRequestId === request._id}
            />
          </Grid>
        ))}
      </Grid>
    ) : (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Group sx={{ fontSize: 48, color: "text.secondary", mb: 2 }} />
        <Typography variant="h6" color="text.secondary" gutterBottom>
          No join requests yet
        </Typography>
        <Typography variant="body2" color="text.secondary">
          You have not requested to join any events yet.
        </Typography>
      </Box>
    )}
  </Box>
);
export default UserRequestsGrid;