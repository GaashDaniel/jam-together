import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Person, Event, CheckCircle, TrendingUp } from "@mui/icons-material";
import useTheme from "../../../shared/hooks/useTheme";
const AdminStatsOverview = ({ stats }) => {
  const { adminTheme, getThemeColor } = useTheme();
  const statsCards = [
    {
      title: "Total Users",
      value: stats.totalUsers || 0,
      icon: Person,
      gradient: getThemeColor(
        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        "linear-gradient(135deg, #434343 0%,rgb(224, 109, 51) 100%)"
      ),
    },
    {
      title: "Total Events",
      value: stats.totalEvents || 0,
      icon: Event,
      gradient: getThemeColor(
        "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        "linear-gradient(135deg, #2d1b69 0%, #11998e 100%)"
      ),
    },
    {
      title: "Active Users",
      value: stats.activeUsers || 0,
      icon: CheckCircle,
      gradient: getThemeColor(
        "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
        "linear-gradient(135deg, #134e5e 0%, #71b280 100%)"
      ),
    },
    {
      title: "Upcoming Events",
      value: stats.upcomingEvents || 0,
      icon: TrendingUp,
      gradient: getThemeColor(
        "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        "linear-gradient(135deg, #360033 0%, #0b8793 100%)"
      ),
    },
  ];
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {statsCards.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card
              elevation={adminTheme.admin.elevation.card}
              sx={{
                background: stat.gradient,
                color: "white",
              }}
            >
              <CardContent sx={{ textAlign: "center" }}>
                <IconComponent sx={{ fontSize: 40, mb: 1, opacity: 0.9 }} />
                <Typography variant="h4" fontWeight="bold">
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {stat.title}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
export default AdminStatsOverview;