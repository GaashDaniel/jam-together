import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Paper, Stack, Button } from "@mui/material";
import LoadingSpinner from "../components/Common/LoadingSpinner";
import JamEventDetailsHeader from "../components/JamEvent/JamEventDetailsHeader";
import JamEventDetailsContent from "../components/JamEvent/JamEventDetailsContent";
import JamEventDetailsRequests from "../components/JamEvent/JamEventDetailsRequests";
import JamEventDetailsActions from "../components/JamEvent/JamEventDetailsActions";
import { useEventDetails } from "../hooks/useEventDetails";
import { useAuth } from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
export default function JamEventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, isDark, getBackgroundColor, getTextColor } = useTheme();
  const {
    event,
    loading,
    error,
    availableInstruments,
    isSubmittingJoinRequest,
    requestActionLoading,
    isDeleting,
    isCancellingRequest,
    joinDialogOpen,
    deleteConfirmOpen,
    cancelRequestConfirmOpen,
    editModalOpen,
    authModalOpen,
    statusMenuAnchorEl,
    activeStatusMenuRequest,
    joinRequest,
    requestToCancel,
    setJoinDialogOpen,
    setDeleteConfirmOpen,
    setCancelRequestConfirmOpen,
    setEditModalOpen,
    setAuthModalOpen,
    handleLike,
    handleJoinRequest,
    handleDeleteEvent,
    handleCancelRequest,
    handleEventUpdated,
    handleGenreClick,
    handleInstrumentClick,
    handleStatusMenuOpen,
    handleStatusMenuClose,
    handleStatusChange,
    handleCancelRequestClick,
    handleJoinRequestChange,
  } = useEventDetails(id);
  const getRequestStatusButton = () => {
    if (!userRequest) return null;
    const status = userRequest.approvalStatus;
    let buttonText, color, variant;
    if (status === null) {
      buttonText = "Pending";
      color = "warning";
      variant = "contained";
    } else if (status === true) {
      buttonText = "Approved";
      color = "success";
      variant = "contained";
    } else {
      buttonText = "Denied";
      color = "error";
      variant = "contained";
    }
    return (
      <Button
        variant={variant}
        size="large"
        color={color}
        disabled
        sx={{ mt: 2 }}
      >
        {buttonText}
      </Button>
    );
  };
  if (loading) return <LoadingSpinner />;
  if (error) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          backgroundColor: getBackgroundColor(),
          minHeight: "100vh",
        }}
      >
        <Typography
          color="error"
          align="center"
          sx={{ color: theme.palette.error.main }}
        >
          Error: {error}
        </Typography>
      </Container>
    );
  }
  if (!event) {
    return (
      <Container
        maxWidth="lg"
        sx={{
          py: 4,
          backgroundColor: getBackgroundColor(),
          minHeight: "100vh",
        }}
      >
        <Typography align="center" sx={{ color: getTextColor("primary") }}>
          Event not found
        </Typography>
      </Container>
    );
  }
  const isOwner = event.createdBy._id === user?._id;
  const isLiked =
    user && event.likes?.some((id) => id.toString() === user._id.toString());
  const userRequest =
    user && event.requests?.find((req) => req.requester._id === user._id);
  const hasRequested = !!userRequest;
  const isPastEvent = new Date(event.scheduledTo) <= new Date();
  const canJoin = user && !hasRequested && !isPastEvent;
  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        backgroundColor: getBackgroundColor(),
        minHeight: "100vh",
      }}
    >
      <Stack spacing={3}>
        <Paper
          sx={{
            p: 4,
            background: isDark
              ? `linear-gradient(135deg, ${theme.palette.grey[800]} 0%, ${theme.palette.grey[900]} 100%)`
              : `linear-gradient(135deg, ${theme.palette.grey[50]} 0%, ${theme.palette.grey[200]} 100%)`,
            border: `1px solid ${theme.palette.divider}`,
          }}
        >
          <JamEventDetailsHeader
            event={event}
            user={user}
            isOwner={isOwner}
            isLiked={isLiked}
            isPastEvent={isPastEvent}
            onLike={handleLike}
            onEdit={() => setEditModalOpen(true)}
            onDelete={() => setDeleteConfirmOpen(true)}
            onViewProfile={(username) => navigate(`/profile/${username}`)}
          />
          <JamEventDetailsContent
            event={event}
            user={user}
            canJoin={canJoin}
            isPastEvent={isPastEvent}
            isOwner={isOwner}
            hasRequested={hasRequested}
            onGenreClick={handleGenreClick}
            onInstrumentClick={handleInstrumentClick}
            onJoinClick={() => setJoinDialogOpen(true)}
            getRequestStatusButton={getRequestStatusButton}
          />
        </Paper>
        <JamEventDetailsRequests
          event={event}
          user={user}
          isOwner={isOwner}
          requestActionLoading={requestActionLoading}
          isCancellingRequest={isCancellingRequest}
          requestToCancel={requestToCancel}
          onStatusMenuOpen={handleStatusMenuOpen}
          onCancelRequestClick={handleCancelRequestClick}
        />
      </Stack>
      <JamEventDetailsActions
        joinDialogOpen={joinDialogOpen}
        deleteConfirmOpen={deleteConfirmOpen}
        cancelRequestConfirmOpen={cancelRequestConfirmOpen}
        editModalOpen={editModalOpen}
        authModalOpen={authModalOpen}
        statusMenuAnchorEl={statusMenuAnchorEl}
        activeStatusMenuRequest={activeStatusMenuRequest}
        event={event}
        user={user}
        joinRequest={joinRequest}
        availableInstruments={availableInstruments}
        requestToCancel={requestToCancel}
        isSubmittingJoinRequest={isSubmittingJoinRequest}
        isDeleting={isDeleting}
        isCancellingRequest={isCancellingRequest}
        onJoinDialogClose={() => setJoinDialogOpen(false)}
        onDeleteConfirmClose={() => setDeleteConfirmOpen(false)}
        onCancelRequestConfirmClose={() => setCancelRequestConfirmOpen(false)}
        onEditModalClose={() => setEditModalOpen(false)}
        onAuthModalClose={() => setAuthModalOpen(false)}
        onStatusMenuClose={handleStatusMenuClose}
        onJoinRequestChange={handleJoinRequestChange}
        onJoinRequest={handleJoinRequest}
        onDeleteEvent={handleDeleteEvent}
        onCancelRequest={handleCancelRequest}
        onEventUpdated={handleEventUpdated}
        onStatusChange={handleStatusChange}
      />
    </Container>
  );
}