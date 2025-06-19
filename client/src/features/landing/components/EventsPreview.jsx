import React from "react";
import { Container, Typography, Box, Grid, Button } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import JamEventCard from "../../events/components/JamEventCard";
import LoadingSpinner from "../../../shared/components/ui/LoadingSpinner";
const EventsPreview = ({
  events,
  isLoading,
  theme,
  getThemeColor,
  onViewAllClick,
}) => (
  <Container maxWidth="lg" sx={{ mb: 8, py: 6 }}>
    <Typography
      variant="h4"
      align="center"
      gutterBottom
      fontWeight="bold"
      sx={{ color: theme.palette.text.primary, mb: 4 }}
    >
      Upcoming Jam Sessions
    </Typography>
    {isLoading ? (
      <LoadingSpinner />
    ) : events.length > 0 ? (
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {events.map((event) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={event._id}>
            <JamEventCard jamEvent={event} mode="preview" />
          </Grid>
        ))}
      </Grid>
    ) : (
      <Typography
        variant="body1"
        align="center"
        sx={{
          mt: 4,
          color: theme.palette.text.secondary,
          fontSize: "1.1rem",
        }}
      >
        No upcoming events found. Be the first to create one!
      </Typography>
    )}
    <Box textAlign="center" mt={6}>
      <Button
        size="large"
        variant="contained"
        onClick={onViewAllClick}
        sx={{
          px: 4,
          py: 1.5,
          borderRadius: theme.shape.borderRadius * 2,
          fontSize: "1.1rem",
          boxShadow: getThemeColor
            ? getThemeColor(
                "0 4px 15px rgba(0,0,0,0.2)",
                "0 4px 15px rgba(0,0,0,0.4)"
              )
            : "0 4px 15px rgba(0,0,0,0.2)",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: getThemeColor
              ? getThemeColor(
                  "0 6px 20px rgba(0,0,0,0.25)",
                  "0 6px 20px rgba(0,0,0,0.5)"
                )
              : "0 6px 20px rgba(0,0,0,0.25)",
          },
          transition: "all 0.3s ease",
        }}
      >
        View All Events
      </Button>
    </Box>
  </Container>
);
export default EventsPreview;