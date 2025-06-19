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
  Box,
} from "@mui/material";
import { Person } from "@mui/icons-material";
const TopActiveUsersChart = React.memo(({ userEngagement, paperSx }) => (
  <Paper sx={paperSx}>
    <Typography
      variant="h6"
      gutterBottom
      sx={{ display: "flex", alignItems: "center", gap: 1 }}
    >
      <Person />
      Most Active Users
    </Typography>
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>User</TableCell>
            <TableCell align="right">Events Created</TableCell>
            <TableCell align="right">Requests Made</TableCell>
            <TableCell align="right">Total Activity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userEngagement.slice(0, 5).map((user, index) => (
            <TableRow key={user._id}>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Chip
                    label={index + 1}
                    size="small"
                    color={index === 0 ? "primary" : "default"}
                  />
                  {user.username}
                </Box>
              </TableCell>
              <TableCell align="right">{user.eventsCreated}</TableCell>
              <TableCell align="right">{user.requestsMade}</TableCell>
              <TableCell align="right">
                <Chip label={user.totalActivity} color="primary" size="small" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Paper>
));
TopActiveUsersChart.displayName = "TopActiveUsersChart";
export default TopActiveUsersChart;