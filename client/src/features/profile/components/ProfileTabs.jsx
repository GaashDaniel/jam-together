import React from "react";
import {
  Paper,
  Tabs,
  Tab,
  Box,
  Typography,
  Grid,
  useMediaQuery,
} from "@mui/material";
import { Event, Group } from "@mui/icons-material";
import UserEventsGrid from "./UserEventsGrid";
import UserRequestsGrid from "./UserRequestsGrid";
const ProfileTabs = ({
  user,
  userEvents,
  joinRequests,
  isOwnProfile,
  tabValue,
  onTabChange,
  theme,
  isDark,
  onCancelClick,
  cancellingRequestId,
}) => {
  const isSmallScreen = useMediaQuery("(max-width:500px)");
  return (
    <Paper
      sx={{
        p: 3,
        background: isDark
          ? `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[900]} 100%)`
          : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[200]} 100%)`,
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Tabs value={tabValue} onChange={onTabChange} sx={{ mb: 3 }}>
        <Tab
          label={isSmallScreen ? "" : `Events Created (${userEvents.length})`}
          icon={<Event />}
          iconPosition={isSmallScreen ? "top" : "start"}
          sx={{
            minWidth: isSmallScreen ? "auto" : "initial",
            "& .MuiTab-iconWrapper": {
              marginRight: isSmallScreen ? 0 : 1,
              marginBottom: isSmallScreen ? 0.5 : 0,
            },
          }}
        />
        {isOwnProfile && (
          <Tab
            label={isSmallScreen ? "" : `My Requests (${joinRequests.length})`}
            icon={<Group />}
            iconPosition={isSmallScreen ? "top" : "start"}
            sx={{
              minWidth: isSmallScreen ? "auto" : "initial",
              "& .MuiTab-iconWrapper": {
                marginRight: isSmallScreen ? 0 : 1,
                marginBottom: isSmallScreen ? 0.5 : 0,
              },
            }}
          />
        )}
      </Tabs>
      {tabValue === 0 && (
        <UserEventsGrid
          user={user}
          userEvents={userEvents}
          isOwnProfile={isOwnProfile}
        />
      )}
      {isOwnProfile && tabValue === 1 && (
        <UserRequestsGrid
          joinRequests={joinRequests}
          onCancelClick={onCancelClick}
          cancellingRequestId={cancellingRequestId}
        />
      )}
    </Paper>
  );
};
export default ProfileTabs;