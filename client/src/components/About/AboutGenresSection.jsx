import React, { useContext } from "react";
import { Paper, Typography, Chip, Stack, useTheme } from "@mui/material";
import ThemeContext from "../../contexts/ThemeContext";
import { getAboutPaperStyles } from "./aboutPaperStyles";
export default function AboutGenresSection() {
  const theme = useTheme();
  const { mode } = useContext(ThemeContext);
  const genres = [
    "Jazz",
    "Blues",
    "Rock",
    "Pop",
    "Classical",
    "Folk",
    "Country",
    "R&B",
    "Soul",
    "Funk",
    "Reggae",
    "Electronic",
    "Hip-Hop",
    "Metal",
    "Indie",
    "Alternative",
    "World Music",
    "Experimental",
  ];
  return (
    <Paper sx={getAboutPaperStyles(theme, mode)}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        fontWeight="bold"
        sx={{ mb: 3 }}
      >
        Musical Genres We Support
      </Typography>
      <Typography
        variant="body1"
        align="center"
        paragraph
        color="text.secondary"
      >
        From classical to contemporary, JamTogether welcomes all musical styles
      </Typography>
      <Stack
        direction="row"
        spacing={1}
        sx={{ flexWrap: "wrap", gap: 1, justifyContent: "center", mt: 3 }}
      >
        {genres.map((genre) => (
          <Chip
            key={genre}
            label={genre}
            color="primary"
            variant={mode === "dark" ? "filled" : "outlined"}
            sx={{
              m: 0.5,
              "&:hover": {
                backgroundColor:
                  mode === "dark"
                    ? theme.palette.primary.dark
                    : theme.palette.primary.light,
                transform: "scale(1.05)",
                transition: "all 0.2s ease-in-out",
              },
            }}
          />
        ))}
      </Stack>
    </Paper>
  );
}