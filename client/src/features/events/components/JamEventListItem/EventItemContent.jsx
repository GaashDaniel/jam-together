import React from "react";
import { Typography } from "@mui/material";
export const EventItemContent = React.memo(({ event, getTextColor }) => (
  <Typography
    variant="body2"
    component="div"
    sx={{
      overflow: "hidden",
      textOverflow: "ellipsis",
      display: "-webkit-box",
      WebkitLineClamp: 2,
      WebkitBoxOrient: "vertical",
      color: getTextColor("secondary"),
      mb: 1,
    }}
  >
    {event.content}
  </Typography>
));
export default EventItemContent;