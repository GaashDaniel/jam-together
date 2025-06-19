import React from "react";
import { Box, Stack, Chip, Tooltip } from "@mui/material";
import { isPastEvent } from "../listItemUtils";
export const EventItemGenres = React.memo(({ event }) => (
  <Box sx={{ mb: 1 }}>
    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
      {isPastEvent(event.scheduledTo) && (
        <Chip label="Past Event" size="small" color="warning" />
      )}
      {event.genres?.slice(0, 3).map((genre, i) => (
        <Chip key={i} label={genre} size="small" />
      ))}
      {event.genres?.length > 3 && (
        <Tooltip
          title={`Additional genres: ${event.genres.slice(3).join(", ")}`}
        >
          <Chip
            label={`+${event.genres.length - 3} more`}
            size="small"
            variant="outlined"
          />
        </Tooltip>
      )}
    </Stack>
  </Box>
));
export default EventItemGenres;