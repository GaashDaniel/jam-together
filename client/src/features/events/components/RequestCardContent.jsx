import React from "react";
import { CardContent, Box, Typography, Chip } from "@mui/material";
import {
  CalendarToday,
  LocationOn,
  Person,
  Schedule,
} from "@mui/icons-material";
export default function RequestCardContent({
  joinRequest,
  eventData,
  getStatusColor,
  formatDate,
}) {
  return (
    <CardContent sx={{ flexGrow: 1, overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          mb: 2,
        }}
      >
        <Chip
          label={joinRequest.status}
          color={getStatusColor(joinRequest.status)}
          size="small"
          sx={{ textTransform: "capitalize" }}
        />
      </Box>
      {}
      {eventData && (
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <CalendarToday
              fontSize="small"
              sx={{ mr: 1, color: "text.secondary" }}
            />
            <Typography variant="body2" color="text.secondary">
              {formatDate(eventData.scheduledTo)}
            </Typography>
          </Box>
          {eventData.location && (
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <LocationOn
                fontSize="small"
                sx={{ mr: 1, color: "text.secondary" }}
              />
              <Typography variant="body2" color="text.secondary">
                {eventData.location.city}, {eventData.location.country}
              </Typography>
            </Box>
          )}
          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <Person fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="body2" color="text.secondary">
              Organized by {eventData.createdBy?.username || "Unknown"}
            </Typography>
          </Box>
        </Box>
      )}
      {}
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" fontWeight="medium" gutterBottom>
          Requested Instrument: {joinRequest.requestedInstrument}
        </Typography>
        {joinRequest.message && (
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              height: "40px",
              lineHeight: 1.4,
            }}
          >
            Message: "{joinRequest.message}"
          </Typography>
        )}
      </Box>
      {}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Schedule fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
        <Typography variant="caption" color="text.secondary">
          Requested on {formatDate(joinRequest.createdAt)}
        </Typography>
      </Box>
    </CardContent>
  );
}