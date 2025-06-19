import React from "react";
import { Grid, Card, CardContent, Box, Typography } from "@mui/material";
import { People, Event, TrendingUp, BarChart } from "@mui/icons-material";
export default function AdminSummaryCards({ summary }) {
  const engagementRate =
    summary.totalUsers > 0
      ? ((summary.activeUsers / summary.totalUsers) * 100).toFixed(1)
      : 0;
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h4" color="primary">
                  {summary.totalUsers}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Users
                </Typography>
              </Box>
              <People color="primary" sx={{ fontSize: 40 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h4" color="secondary">
                  {summary.totalEvents}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Events
                </Typography>
              </Box>
              <Event color="secondary" sx={{ fontSize: 40 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h4" color="success.main">
                  {summary.activeUsers}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Users
                </Typography>
              </Box>
              <TrendingUp color="success" sx={{ fontSize: 40 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 3 }}>
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h4" color="warning.main">
                  {engagementRate}%
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Engagement Rate
                </Typography>
              </Box>
              <BarChart color="warning" sx={{ fontSize: 40 }} />
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}