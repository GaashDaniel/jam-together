import React, { useContext } from "react";
import { Paper, Typography, Grid, useTheme } from "@mui/material";
import { Event, Search, LibraryMusic } from "@mui/icons-material";
import ThemeContext from "../../contexts/ThemeContext";
export default function AboutHowItWorksSection() {
  const theme = useTheme();
  const { mode } = useContext(ThemeContext);
  const paperBackground =
    mode === "dark"
      ? `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[900]} 100%)`
      : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[200]} 100%)`;
  return (
    <Paper
      sx={{
        p: 4,
        mb: 4,
        background: paperBackground,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        fontWeight="bold"
        sx={{ mb: 4 }}
      >
        How JamTogether Works
      </Typography>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: "center" }}>
          <Event sx={{ fontSize: 50, color: "primary.main", mb: 2 }} />
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Create Events
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Organize jam sessions by specifying the date, location, genres, and
            instruments needed. Set your requirements and let the community know
            what kind of musical experience you're looking to create.
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: "center" }}>
          <Search sx={{ fontSize: 50, color: "primary.main", mb: 2 }} />
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Discover & Join
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Browse through available jam sessions, filter by genre, location, or
            instruments. Request to join sessions that match your interests and
            skill level.
          </Typography>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: "center" }}>
          <LibraryMusic sx={{ fontSize: 50, color: "primary.main", mb: 2 }} />
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Make Music
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Connect with fellow musicians, attend jam sessions, and create
            beautiful music together. Build lasting musical relationships and
            expand your network.
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}