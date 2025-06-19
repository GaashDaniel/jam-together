import React from "react";
import { Paper, Tabs, Tab, Badge } from "@mui/material";
import useTheme from "../../../shared/hooks/useTheme";
const AdminTabsPanel = ({
  tabValue,
  onTabChange,
  filteredUsersCount,
  filteredEventsCount,
  selectedUsersCount,
  selectedEventsCount,
}) => {
  const { adminTheme, mode, getThemeColor } = useTheme();
  return (
    <Paper
      sx={{
        mb: 3,
        background:
          mode === "dark"
            ? `linear-gradient(135deg, ${
                adminTheme.admin.background.paper
              } 0%, ${getThemeColor("#2d2d2d", "#1a1a1a")} 100%)`
            : `linear-gradient(135deg, ${getThemeColor(
                "#f8f9fa",
                "#e9ecef"
              )} 0%, ${adminTheme.admin.background.paper} 100%)`,
        elevation: adminTheme.admin.elevation.card,
        border: `1px solid ${getThemeColor("#e9ecef", "#404040")}`,
      }}
    >
      <Tabs
        value={tabValue}
        onChange={onTabChange}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          "& .MuiTab-root": {
            color: adminTheme.admin.text.secondary,
            "&.Mui-selected": {
              color: adminTheme.admin.primary,
            },
          },
        }}
      >
        <Tab
          label={
            <Badge badgeContent={selectedUsersCount} color="primary">
              {`Users (${filteredUsersCount})`}
            </Badge>
          }
        />
        <Tab
          label={
            <Badge badgeContent={selectedEventsCount} color="primary">
              {`Events (${filteredEventsCount})`}
            </Badge>
          }
        />
      </Tabs>
    </Paper>
  );
};
export default AdminTabsPanel;