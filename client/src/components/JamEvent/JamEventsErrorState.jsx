import React from "react";
import { Container, Typography } from "@mui/material";
import useTheme from "../../shared/hooks/useTheme";
const JamEventsErrorState = ({ error }) => {
  const { theme, getBackgroundColor } = useTheme();
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 4,
        backgroundColor: getBackgroundColor(),
        minHeight: "100vh",
      }}
    >
      <Typography
        color="error"
        align="center"
        sx={{ color: theme.palette.error.main }}
      >
        Error loading events: {error.message}
      </Typography>
    </Container>
  );
};
export default JamEventsErrorState;