import React from "react";
import { Paper, Box, ToggleButtonGroup, ToggleButton } from "@mui/material";
import SearchBar from "../../../components/Common/SearchBar";
import useTheme from "../../../shared/hooks/useTheme";
const AdminFilterControls = ({ filters, onFilterChange, type = "users" }) => {
  const { mode, getThemeColor, adminTheme } = useTheme();
  return (
    <Paper
      sx={{
        p: 2,
        mb: 3,
        background:
          mode === "dark"
            ? `linear-gradient(135deg, ${getThemeColor(
                "#2d2d2d",
                "#1a1a1a"
              )} 0%, ${getThemeColor("#424242", "#2d2d2d")} 100%)`
            : `linear-gradient(135deg, ${getThemeColor(
                "#f8f9fa",
                "#e9ecef"
              )} 0%, ${getThemeColor("#e9ecef", "#f8f9fa")} 100%)`,
        border: `1px solid ${getThemeColor("#e9ecef", "#404040")}`,
      }}
    >
      <SearchBar
        onSearch={(searchTerm) => onFilterChange(type, "search", searchTerm)}
        initialValue={filters[type].search}
        placeholder={`Search ${type} by ${
          type === "users"
            ? "name, username, or email"
            : "title, content, or location"
        }...`}
        sx={{ mb: 2 }}
      />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {type === "users" && (
          <ToggleButtonGroup
            value={filters.users.role}
            exclusive
            onChange={(event, newRole) => {
              if (newRole !== null) {
                onFilterChange("users", "role", newRole);
              }
            }}
            size="small"
            sx={{
              "& .MuiToggleButton-root": {
                color: adminTheme.admin.text.secondary,
                borderColor: getThemeColor("#dee2e6", "#495057"),
                "&.Mui-selected": {
                  backgroundColor: adminTheme.admin.primary,
                  color: "white",
                },
              },
            }}
          >
            <ToggleButton value="all">All</ToggleButton>
            <ToggleButton value="user">Users</ToggleButton>
            <ToggleButton value="admin">Admins</ToggleButton>
          </ToggleButtonGroup>
        )}
      </Box>
    </Paper>
  );
};
export default AdminFilterControls;