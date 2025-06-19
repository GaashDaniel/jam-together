import React, { useContext } from "react";
import { Paper, Typography, Grid, Box, useTheme } from "@mui/material";
import ThemeContext from "../../contexts/ThemeContext";
import { getAboutPaperStyles } from "./aboutPaperStyles";
export default function AboutValuesSection() {
  const theme = useTheme();
  const { mode } = useContext(ThemeContext);
  const values = [
    {
      emoji: "🎵",
      title: "Inclusivity",
      description:
        "Musicians of all skill levels, backgrounds, and musical preferences are welcome in our community.",
    },
    {
      emoji: "🤝",
      title: "Collaboration",
      description:
        "We believe the best music happens when talented individuals come together with open minds and hearts.",
    },
    {
      emoji: "🎯",
      title: "Growth",
      description:
        "Every jam session is an opportunity to learn, improve, and discover new aspects of your musical journey.",
    },
  ];
  return (
    <Paper sx={getAboutPaperStyles(theme, mode)}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        fontWeight="bold"
        sx={{ mb: 4 }}
      >
        Our Community Values
      </Typography>
      <Grid container spacing={4}>
        {values.map((value, index) => (
          <Grid size={{ xs: 12, md: 4 }} key={index}>
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                {value.emoji} {value.title}
              </Typography>
              <Typography variant="body2">{value.description}</Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}