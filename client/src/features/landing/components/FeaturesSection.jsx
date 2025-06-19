import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import { MusicNote, People, CalendarMonth } from "@mui/icons-material";
export default function FeaturesSection({ theme, isDark, getThemeColor }) {
  const features = [
    {
      icon: MusicNote,
      title: "Find Your Sound",
      description:
        "Discover jam sessions that match your musical style and instrument preferences",
    },
    {
      icon: People,
      title: "Connect with Musicians",
      description:
        "Meet talented musicians in your area and collaborate on amazing music",
    },
    {
      icon: CalendarMonth,
      title: "Organize Sessions",
      description:
        "Create and manage your own jam sessions with our easy-to-use tools",
    },
  ];
  return (
    <Container>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        fontWeight="bold"
        sx={{
          color: theme.palette.text.primary,
          mb: 4,
        }}
      >
        Why JamTogether?
      </Typography>
      <Paper
        sx={{
          p: 4,
          textAlign: "center",
          height: "100%",
          background: isDark
            ? `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[900]} 100%)`
            : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[200]} 100%)`,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          boxShadow: getThemeColor(
            "0 4px 20px rgba(0,0,0,0.1)",
            "0 4px 20px rgba(0,0,0,0.3)"
          ),
        }}
      >
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <React.Fragment key={index}>
              <IconComponent
                sx={{
                  fontSize: 60,
                  color: theme.palette.primary.main,
                  mb: 2,
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
                }}
              />
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: 600,
                }}
              >
                {feature.title}
              </Typography>
              <Typography
                sx={{
                  color: theme.palette.text.secondary,
                  lineHeight: 1.6,
                  mb: index < features.length - 1 ? 4 : 0,
                }}
              >
                {feature.description}
              </Typography>
            </React.Fragment>
          );
        })}
      </Paper>
    </Container>
  );
}