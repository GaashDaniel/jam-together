import React from "react";
import { Typography } from "@mui/material";
export default function AboutHeroSection() {
  return (
    <>
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        fontWeight="bold"
        color="primary"
      >
        About JamTogether
      </Typography>
      <Typography
        variant="h6"
        align="center"
        color="text.secondary"
        sx={{ mb: 6 }}
      >
        Where musicians connect, collaborate, and create magic together
      </Typography>
    </>
  );
}