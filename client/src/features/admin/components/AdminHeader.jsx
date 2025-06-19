import React from "react";
import { Box, Typography } from "@mui/material";
import { AdminPanelSettings } from "@mui/icons-material";
import useTheme from "../../../shared/hooks/useTheme";
const AdminHeader = () => {
  const { adminTheme } = useTheme();
  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <AdminPanelSettings color="primary" sx={{ fontSize: 40 }} />
          <Typography
            variant="h4"
            component="h1"
            fontWeight="bold"
            sx={{ color: adminTheme.admin.text.primary }}
          >
            Admin Dashboard
          </Typography>
        </Box>
      </Box>
      <Typography
        variant="body1"
        sx={{ color: adminTheme.admin.text.secondary }}
      >
        Manage users, events, and monitor platform activity
      </Typography>
    </Box>
  );
};
export default AdminHeader;