import React from "react";
import { Box, Stack, Chip, Tooltip } from "@mui/material";
export const EventItemInstruments = React.memo(
  ({ event }) =>
    event.instruments &&
    event.instruments.length > 0 && (
      <Box>
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
          {event.instruments?.slice(0, 7).map((instrument, i) => (
            <Tooltip
              key={i}
              title={
                instrument.playedBy
                  ? `Played by: ${
                      typeof instrument.playedBy === "object" &&
                      instrument.playedBy.username
                        ? instrument.playedBy.username
                        : "Unknown User"
                    }`
                  : "Available"
              }
            >
              <Chip
                label={instrument.instrument}
                size="small"
                color={instrument.playedBy ? "success" : "default"}
                variant="outlined"
              />
            </Tooltip>
          ))}
          {event.instruments?.length > 7 && (
            <Tooltip
              title={`${event.instruments
                .slice(7)
                .map((inst) => inst.instrument)
                .join(", ")}`}
            >
              <Chip
                label={` +${event.instruments.length - 7}`}
                size="small"
                variant="outlined"
                sx={{ fontWeight: "medium" }}
              />
            </Tooltip>
          )}
        </Stack>
      </Box>
    )
);
export default EventItemInstruments;