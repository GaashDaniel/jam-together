import React from "react";
import { Typography } from "@mui/material";
export default function EventItemHeader({ event, getTextColor }) {
  return (
    <Typography
      variant="h6"
      fontWeight="bold"
      sx={{
        color: getTextColor("primary"),
        mb: 1,
      }}
    >
      {event.title}
    </Typography>
  );
}