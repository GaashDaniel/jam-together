import React, { useContext } from "react";
import {
  Paper,
  Typography,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import {
  LocationOn,
  People,
  Schedule,
  Star,
  Security,
  Favorite,
  Group,
  Public,
} from "@mui/icons-material";
import ThemeContext from "../../contexts/ThemeContext";
import { getAboutPaperStyles } from "./aboutPaperStyles";
export default function AboutFeaturesSection() {
  const theme = useTheme();
  const { mode } = useContext(ThemeContext);
  const leftFeatures = [
    {
      icon: <LocationOn color="primary" />,
      primary: "Location-Based Discovery",
      secondary: "Find jam sessions near you or in specific cities worldwide",
    },
    {
      icon: <People color="primary" />,
      primary: "Smart Matching",
      secondary:
        "Connect with musicians who share your musical interests and skill level",
    },
    {
      icon: <Schedule color="primary" />,
      primary: "Real-Time Updates",
      secondary:
        "Get instant notifications about event changes and new opportunities",
    },
    {
      icon: <Star color="primary" />,
      primary: "Skill-Based Profiles",
      secondary: "Showcase your musical experience and instruments you play",
    },
  ];
  const rightFeatures = [
    {
      icon: <Security color="primary" />,
      primary: "Safe & Secure",
      secondary: "Verified user profiles and secure communication channels",
    },
    {
      icon: <Favorite color="primary" />,
      primary: "Favorites System",
      secondary: "Save and track events you're interested in",
    },
    {
      icon: <Group color="primary" />,
      primary: "Community Building",
      secondary: "Build lasting relationships with fellow musicians",
    },
    {
      icon: <Public color="primary" />,
      primary: "Global Reach",
      secondary: "Connect with musicians from around the world",
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
        Platform Features
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <List>
            {leftFeatures.map((feature, index) => (
              <ListItem key={index}>
                <ListItemIcon>{feature.icon}</ListItemIcon>
                <ListItemText
                  primary={feature.primary}
                  secondary={feature.secondary}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <List>
            {rightFeatures.map((feature, index) => (
              <ListItem key={index}>
                <ListItemIcon>{feature.icon}</ListItemIcon>
                <ListItemText
                  primary={feature.primary}
                  secondary={feature.secondary}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
}