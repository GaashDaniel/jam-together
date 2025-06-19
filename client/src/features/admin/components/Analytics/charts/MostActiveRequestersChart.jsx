import React from "react";
import {
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  Box,
} from "@mui/material";
import { Person } from "@mui/icons-material";
const MostActiveRequestersChart = React.memo(
  ({ mostActiveRequesters, paperSx }) => (
    <Paper sx={paperSx}>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <Person />
        Most Active Requesters
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell align="center">Approved</TableCell>
              <TableCell align="center">Success Rate</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mostActiveRequesters?.slice(0, 6).map((user, index) => (
              <TableRow key={user._id}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip
                      label={index + 1}
                      size="small"
                      color={index === 0 ? "primary" : "default"}
                    />
                    {user.username || "Unknown"}
                  </Box>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={user.totalRequests}
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell align="center">
                  <Stack direction="row" spacing={0.5} justifyContent="center">
                    <Chip
                      label={user.approvedRequests}
                      size="small"
                      color="success"
                      variant="outlined"
                    />
                    {user.pendingRequests > 0 && (
                      <Chip
                        label={user.pendingRequests}
                        size="small"
                        color="warning"
                        variant="outlined"
                      />
                    )}
                  </Stack>
                </TableCell>
                <TableCell align="center">
                  <Chip
                    label={`${user.successRate?.toFixed(0) || 0}%`}
                    size="small"
                    color={
                      user.successRate > 70
                        ? "success"
                        : user.successRate > 40
                        ? "warning"
                        : "error"
                    }
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
);
MostActiveRequestersChart.displayName = "MostActiveRequestersChart";
export default MostActiveRequestersChart;