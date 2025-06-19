import React from "react";
import { Typography } from "@mui/material";
export const EventItemHeader = React.memo(({ event, getTextColor }) => (
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
));
export default EventItemHeader;