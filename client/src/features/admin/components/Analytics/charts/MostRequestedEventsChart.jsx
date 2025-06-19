import React from "react";
import {
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Stack,
  Box,
} from "@mui/material";
import { TrendingUp } from "@mui/icons-material";
const MostRequestedEventsChart = React.memo(
  ({ mostRequestedEvents, paperSx }) => (
    <Paper sx={paperSx}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <TrendingUp />
        Most Requested Events
      </Typography>
      <List dense>
        {mostRequestedEvents?.slice(0, 6).map((event, index) => (
          <ListItem key={event._id} divider={index < 5}>
            <ListItemText
              primary={event.eventTitle || "Untitled Event"}
              secondary={
                <React.Fragment>
                  <Typography
                    variant="caption"
                    display="block"
                    component="span"
                  >
                    By {event.eventCreator || "Unknown"} • {event.requestCount}{" "}
                    requests
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                    <Chip
                      size="small"
                      label={`${event.approvedCount} approved`}
                      color="success"
                      variant="outlined"
                    />
                    {event.pendingCount > 0 && (
                      <Chip
                        size="small"
                        label={`${event.pendingCount} pending`}
                        color="warning"
                        variant="outlined"
                      />
                    )}
                    {event.deniedCount > 0 && (
                      <Chip
                        size="small"
                        label={`${event.deniedCount} denied`}
                        color="error"
                        variant="outlined"
                      />
                    )}
                  </Stack>
                </React.Fragment>
              }
              secondaryTypographyProps={{ component: "div" }}
            />
            <Box sx={{ textAlign: "right" }}>
              <Chip
                label={`${event.approvalRate?.toFixed(0) || 0}%`}
                color={
                  event.approvalRate > 70
                    ? "success"
                    : event.approvalRate > 40
                    ? "warning"
                    : "error"
                }
                size="small"
              />
              <Typography
                variant="caption"
                display="block"
                color="text.secondary"
              >
                approval rate
              </Typography>
            </Box>
          </ListItem>
        ))}
      </List>
    </Paper>
  )
);
MostRequestedEventsChart.displayName = "MostRequestedEventsChart";
export default MostRequestedEventsChart;