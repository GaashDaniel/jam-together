import React from "react";
import { Typography } from "@mui/material";
const JamEventsResultsSummary = ({ isLoading, totalEvents, getTextColor }) => {
  return (
    <Typography variant="body2" sx={{ color: getTextColor("secondary") }}>
      {isLoading ? "Loading..." : `${totalEvents || 0} events found`}
    </Typography>
  );
};
export default JamEventsResultsSummary;