import { useState } from "react";
import { useToast } from "../../../hooks/useToast";
import { api } from "../../../services/api";
export const useRequestManagement = (id, refreshEvent) => {
  const { showToast } = useToast();
  const [requestActionLoading, setRequestActionLoading] = useState({});
  const [statusMenuAnchorEl, setStatusMenuAnchorEl] = useState({});
  const [activeStatusMenuRequest, setActiveStatusMenuRequest] = useState(null);
  const handleRequestAction = async (requestId, action) => {
    try {
      setRequestActionLoading((prev) => ({ ...prev, [requestId]: action }));
      let backendAction;
      if (action === "approved" || action === "approve") {
        backendAction = "approve";
      } else if (action === "rejected" || action === "reject") {
        backendAction = "reject";
      } else if (action === "pending") {
        backendAction = "pending";
      }
      await api.patch(`/jamEvents/${id}/approveJoin/${requestId}`, {
        action: backendAction,
      });
      refreshEvent();
      const actionMessage =
        action === "pending" ? "set to pending" : `${action}d`;
      showToast(`Request ${actionMessage} successfully!`, "success");
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setRequestActionLoading((prev) => {
        const newState = { ...prev };
        delete newState[requestId];
        return newState;
      });
    }
  };
  const handleStatusMenuOpen = (event, requestId) => {
    setStatusMenuAnchorEl((prev) => ({
      ...prev,
      [requestId]: event.currentTarget,
    }));
    setActiveStatusMenuRequest(requestId);
  };
  const handleStatusMenuClose = (requestId) => {
    setStatusMenuAnchorEl((prev) => {
      const newState = { ...prev };
      delete newState[requestId];
      return newState;
    });
    setActiveStatusMenuRequest(null);
  };
  const handleStatusChange = async (requestId, newStatus) => {
    handleStatusMenuClose(requestId);
    await handleRequestAction(requestId, newStatus);
  };
  return {
    requestActionLoading,
    statusMenuAnchorEl,
    activeStatusMenuRequest,
    handleRequestAction,
    handleStatusMenuOpen,
    handleStatusMenuClose,
    handleStatusChange,
  };
};