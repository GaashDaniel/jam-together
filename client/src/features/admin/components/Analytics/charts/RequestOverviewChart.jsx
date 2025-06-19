import React from "react";
import {
  Paper,
  Typography,
  Grid,
  Box,
  LinearProgress,
  Stack,
} from "@mui/material";
import { RequestPage } from "@mui/icons-material";
import {
  processRequestStats,
  getStatusColor,
  formatResponseTime,
} from "../utils/analyticsUtils";
const RequestOverviewChart = React.memo(
  ({ requestStats, requestResponseTimes, paperSx }) => {
    const finalRequestStatsData = processRequestStats(requestStats);
    const totalRequestsCalc = Object.values(finalRequestStatsData).reduce(
      (sum, count) => sum + count,
      0
    );
    return (
      <Paper sx={paperSx}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <RequestPage />
          Request Status Overview
        </Typography>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {Object.entries(finalRequestStatsData).map(([status, count]) => {
            const percentage =
              totalRequestsCalc > 0
                ? ((count / totalRequestsCalc) * 100).toFixed(1)
                : 0;
            return (
              <Grid size={{ xs: 4 }} key={status}>
                <Box sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h4"
                    color={`${getStatusColor(status)}.main`}
                  >
                    {count}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {status}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {percentage}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={parseFloat(percentage)}
                    color={getStatusColor(status)}
                    sx={{ height: 6, borderRadius: 3, mt: 1 }}
                  />
                </Box>
              </Grid>
            );
          })}
        </Grid>
        {requestResponseTimes && requestResponseTimes.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Average Response Times
            </Typography>
            <Stack spacing={1}>
              {requestResponseTimes.map((responseTime) => (
                <Box
                  key={responseTime._id}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography
                    variant="body2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    {responseTime._id}:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formatResponseTime(responseTime.avgResponseTimeHours)}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Paper>
    );
  }
);
RequestOverviewChart.displayName = "RequestOverviewChart";
export default RequestOverviewChart;