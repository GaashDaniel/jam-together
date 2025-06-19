import React, { useContext } from "react";
import { Paper, Typography, useTheme } from "@mui/material";
import ThemeContext from "../../contexts/ThemeContext";
import { getAboutPaperStyles } from "./aboutPaperStyles";
export default function AboutJoinSection() {
  const theme = useTheme();
  const { mode } = useContext(ThemeContext);
  return (
    <Paper
      sx={{
        ...getAboutPaperStyles(theme, mode),
        textAlign: "center",
        mb: 0, 
      }}
    >
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Ready to Start Jamming?
      </Typography>
      <Typography
        variant="body1"
        paragraph
        sx={{ fontSize: "1.1rem", maxWidth: "600px", mx: "auto" }}
      >
        Join thousands of musicians who have already discovered the joy of
        collaborative music-making. Whether you're looking to perform, learn, or
        simply have fun with music, JamTogether is your gateway to an incredible
        musical community.
      </Typography>
      <Typography variant="h6" sx={{ mt: 3 }}>
        🎸 Create your profile • 🎹 Find jam sessions • 🎤 Make music together
      </Typography>
    </Paper>
  );
}