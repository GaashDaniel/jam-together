import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Alert,
} from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { useRequests } from "../hooks/useRequests";
import { useToast } from "../../../hooks/useToast";
import UserRequestsGrid from "../../profile/components/UserRequestsGrid";
import ConfirmationModal from "../../../shared/components/ui/ConfirmationModal";
import LoadingSpinner from "../../../shared/components/ui/LoadingSpinner";
const MyRequestsPage = () => {
  const { requests, loading, error, refreshRequests, setRequests } =
    useRequests();
  const { showToast } = useToast();
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [requestToCancel, setRequestToCancel] = useState(null);
  const [cancellingRequestId, setCancellingRequestId] = useState(null);
  const handleRefresh = () => {
    refreshRequests();
  };
  const handleCancelClick = (request) => {
    setRequestToCancel(request);
    setCancelDialogOpen(true);
  };
  const handleCancelRequest = async () => {
    if (!requestToCancel) return;
    try {
      setCancellingRequestId(requestToCancel._id);
      const api = (await import("../../../services/api")).api;
      await api.delete(`/joinRequests/${requestToCancel._id}`);

      setRequests((prevRequests) =>
        prevRequests.filter((req) => req._id !== requestToCancel._id)
      );

      showToast("Request cancelled successfully", "success");
    } catch (error) {
      showToast(error.message || "Failed to cancel request", "error");
    } finally {
      setCancellingRequestId(null);
      setCancelDialogOpen(false);
      setRequestToCancel(null);
    }
  };
  if (loading) return <LoadingSpinner />;
  if (error) return <Alert severity="error">{error}</Alert>;
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1">
          My Join Requests
        </Typography>
        <Tooltip title="Refresh requests">
          <IconButton onClick={handleRefresh} color="primary">
            <Refresh />
          </IconButton>
        </Tooltip>
      </Box>
      <UserRequestsGrid
        joinRequests={requests}
        onCancelClick={handleCancelClick}
        cancellingRequestId={cancellingRequestId}
      />
      <ConfirmationModal
        open={cancelDialogOpen}
        onClose={() => setCancelDialogOpen(false)}
        onConfirm={handleCancelRequest}
        type="warning"
        title="Cancel Join Request"
        message={`Are you sure you want to cancel your request to join "${requestToCancel?.jamEvent?.title}"? This action cannot be undone.`}
        confirmText="Cancel Request"
        loading={cancellingRequestId === requestToCancel?._id}
      />
    </Container>
  );
};
export default MyRequestsPage;
