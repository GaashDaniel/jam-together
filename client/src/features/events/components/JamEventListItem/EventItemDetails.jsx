import React from "react";
import { Box, Typography } from "@mui/material";
import { Person, CalendarToday, LocationOn } from "@mui/icons-material";
import { formatDateTime } from "../listItemUtils";
export const EventItemDetails = React.memo(({ event, getTextColor }) => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      gap: 2,
      mb: 1,
      flexWrap: "wrap",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <Person fontSize="small" sx={{ color: getTextColor("secondary") }} />
      <Typography
        variant="body2"
        component="span"
        sx={{ color: getTextColor("secondary") }}
      >
        {event.createdBy?.username || event.createdBy}
      </Typography>
    </Box>
    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
      <CalendarToday
        fontSize="small"
        sx={{ color: getTextColor("secondary") }}
      />
      <Typography
        variant="body2"
        component="span"
        sx={{ color: getTextColor("secondary") }}
      >
        {formatDateTime(event.scheduledTo)}
      </Typography>
    </Box>
    {event.location?.city && (
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <LocationOn
          fontSize="small"
          sx={{ color: getTextColor("secondary") }}
        />
        <Typography
          variant="body2"
          component="span"
          sx={{ color: getTextColor("secondary") }}
        >
          {event.location.city}, {event.location.country}
        </Typography>
      </Box>
    )}
  </Box>
));
export default EventItemDetails;