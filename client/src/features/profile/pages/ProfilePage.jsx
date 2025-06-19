import React from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Typography, Box } from "@mui/material";
import { useProfile } from "../hooks/useProfile";
import useTheme from "../../../shared/hooks/useTheme";
import LoadingSpinner from "../../../shared/components/ui/LoadingSpinner";
import ConfirmationModal from "../../../shared/components/ui/ConfirmationModal";
import EditProfileModal from "../../../components/Common/EditProfileModal";
import ProfileSidebar from "../components/ProfileSidebar";
import ProfileTabs from "../components/ProfileTabs";
const ProfilePage = () => {
  const { username } = useParams();
  const { theme, isDark } = useTheme();
  const {
    user,
    userEvents,
    joinRequests,
    loading,
    error,
    tabValue,
    cancellingRequestId,
    cancelConfirmOpen,
    requestToCancel,
    editProfileOpen,
    isOwnProfile,
    handleTabChange,
    handleCancelClick,
    handleCancelRequest,
    handleEditProfileOpen,
    handleEditProfileClose,
    setCancelConfirmOpen,
  } = useProfile(username);
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" color="error" gutterBottom>
            {error}
          </Typography>
        </Box>
      </Container>
    );
  }
  if (!user) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6" align="center">
          User not found
        </Typography>
      </Container>
    );
  }
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 4 }}>
          <ProfileSidebar
            user={user}
            isOwnProfile={isOwnProfile}
            theme={theme}
            isDark={isDark}
            onEditClick={handleEditProfileOpen}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 8 }}>
          <ProfileTabs
            user={user}
            userEvents={userEvents}
            joinRequests={joinRequests}
            isOwnProfile={isOwnProfile}
            tabValue={tabValue}
            onTabChange={handleTabChange}
            theme={theme}
            isDark={isDark}
            onCancelClick={handleCancelClick}
            cancellingRequestId={cancellingRequestId}
          />
        </Grid>
      </Grid>
      <ConfirmationModal
        open={cancelConfirmOpen}
        onClose={() => setCancelConfirmOpen(false)}
        onConfirm={handleCancelRequest}
        type="warning"
        title="Cancel Join Request"
        message={`Are you sure you want to cancel your request to join "${requestToCancel?.jamEvent?.title}"? This action cannot be undone.`}
        confirmText="Cancel Request"
        loading={cancellingRequestId === requestToCancel?._id}
      />
      {isOwnProfile && (
        <EditProfileModal
          open={editProfileOpen}
          onClose={handleEditProfileClose}
        />
      )}
    </Container>
  );
};
export default ProfilePage;