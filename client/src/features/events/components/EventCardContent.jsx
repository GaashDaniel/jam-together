import React from "react";
import { CardContent, Typography, Stack, Chip } from "@mui/material";
export default function EventCardContent({ eventData }) {
  return (
    <CardContent sx={{ flexGrow: 1, overflow: "hidden" }}>
      {eventData.genres && eventData.genres.length > 0 && (
        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}
        >
          {eventData.genres.slice(0, 3).map((genre, index) => (
            <Chip key={index} label={genre} size="small" />
          ))}
          {eventData.genres.length > 3 && (
            <Chip
              label={`+${eventData.genres.length - 3}`}
              size="small"
              variant="outlined"
              sx={{ display: "block", width: "fit-content" }}
            />
          )}
        </Stack>
      )}
      {eventData.requiredInstruments &&
        eventData.requiredInstruments.length > 0 && (
          <Stack
            direction="row"
            spacing={1}
            sx={{ mb: 2, flexWrap: "wrap", gap: 1 }}
          >
            {eventData.requiredInstruments
              .slice(0, 3)
              .map((instrument, index) => (
                <Chip
                  key={index}
                  label={instrument}
                  size="small"
                  variant="outlined"
                />
              ))}
            {eventData.requiredInstruments.length > 3 && (
              <Chip
                label={`+${eventData.requiredInstruments.length - 3}`}
                size="small"
                variant="outlined"
                sx={{ display: "block", width: "fit-content" }}
              />
            )}
          </Stack>
        )}
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          height: "60px",
          lineHeight: 1.4,
        }}
      >
        {eventData.content}
      </Typography>
    </CardContent>
  );
}