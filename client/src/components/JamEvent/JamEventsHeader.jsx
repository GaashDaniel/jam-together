import React from "react";
import { Typography, Box, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import useTheme from "../../shared/hooks/useTheme";
const JamEventsHeader = ({ user, onCreateEvent }) => {
  const { theme, getTextColor } = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2,
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        fontWeight="bold"
        sx={{ color: getTextColor("primary") }}
      >
        Jam Sessions
      </Typography>
      {user && (
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={onCreateEvent}
          sx={{
            backgroundColor: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Create Event
        </Button>
      )}
    </Box>
  );
};
export default JamEventsHeader;