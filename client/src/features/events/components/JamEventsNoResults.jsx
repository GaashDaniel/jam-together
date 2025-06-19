import React from "react";
import { Paper, Typography } from "@mui/material";
import useTheme from "../../../shared/hooks/useTheme";
const JamEventsNoResults = ({ activeFiltersCount, getTextColor }) => {
  const { theme, isDark } = useTheme();
  return (
    <Paper
      sx={{
        p: 4,
        textAlign: "center",
        background: isDark
          ? `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[900]} 100%)`
          : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[200]} 100%)`,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{ color: getTextColor("secondary") }}
      >
        No events found
      </Typography>
      <Typography
        variant="body2"
        sx={{
          mb: 2,
          color: getTextColor("secondary"),
        }}
      >
        {activeFiltersCount > 0
          ? "Try adjusting your filters or search terms"
          : "Be the first to create a jam session!"}
      </Typography>
    </Paper>
  );
};
export default JamEventsNoResults;