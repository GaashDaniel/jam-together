import React, { useContext } from "react";
import { Paper, Typography, Box, useTheme } from "@mui/material";
import { MusicNote } from "@mui/icons-material";
import ThemeContext from "../../contexts/ThemeContext";
export default function AboutMissionSection() {
  const theme = useTheme();
  const { mode } = useContext(ThemeContext);
  return (
    <Paper
      sx={{
        p: 4,
        mb: 4,
        textAlign: "center",
        background:
          mode === "dark"
            ? `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`
            : `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
        color: theme.palette.primary.contrastText,
      }}
    >
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <MusicNote sx={{ fontSize: 60, color: "primary.main", mb: 2 }} />
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Our Mission
        </Typography>
      </Box>
      <Typography
        variant="body1"
        paragraph
        sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
      >
        JamTogether is a revolutionary platform designed to bridge the gap
        between musicians worldwide. We believe that music is a universal
        language that brings people together, and our mission is to make it
        easier than ever for musicians to find each other, collaborate, and
        create extraordinary musical experiences.
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}
      >
        Whether you're a seasoned professional, an enthusiastic amateur, or
        someone just starting their musical journey, JamTogether provides the
        tools and community you need to discover new musical partnerships and
        expand your creative horizons.
      </Typography>
    </Paper>
  );
}