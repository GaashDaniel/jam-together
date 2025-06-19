import { useEventData } from "./useEventData";
import { useJoinRequest } from "./useJoinRequest";
import { useRequestManagement } from "./useRequestManagement";
import { useEventDialogs } from "./useEventDialogs";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast";
import { api } from "../../../services/api";
export const useEventDetails = (id) => {
  const { event, setEvent, loading, error, refreshEvent } = useEventData(id);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  const handleLike = async () => {
    if (!user) {
      return { needsAuth: true };
    }
    const currentLikes = event?.likes || [];
    const userIdStr = user._id.toString();
    const isCurrentlyLiked = currentLikes.some(
      (id) => id.toString() === userIdStr
    );
    setEvent((prevEvent) => {
      if (!prevEvent) return prevEvent;
      const prevLikes = prevEvent.likes || [];
      let newLikes;
      if (isCurrentlyLiked) {
        newLikes = prevLikes.filter((id) => id.toString() !== userIdStr);
      } else {
        newLikes = [...prevLikes, user._id];
      }
      return {
        ...prevEvent,
        likes: [...newLikes],
        _id: prevEvent._id,
        __v: prevEvent.__v,
      };
    });
    try {
      const data = await api.post(`/jamEvents/${id}/like`);
      showToast(
        data.isLiked ? "Added to favorites!" : "Removed from favorites!",
        "success"
      );
      setTimeout(() => refreshEvent(), 100);
      return { success: true, data };
    } catch (error) {
      setEvent((prevEvent) => ({
        ...prevEvent,
        likes: currentLikes,
      }));
      showToast(error.message || "Failed to like event", "error");
      return { success: false, error };
    }
  };
  const handleDeleteEvent = async () => {
    try {
      await api.delete(`/jamEvents/${id}`);
      showToast("Event deleted successfully", "success");
      if (window.history.length > 1) {
        navigate(-1);
      } else {
        navigate("/events");
      }
    } catch (error) {
      showToast(error.message || "Failed to delete event", "error");
    }
  };
  const handleEventUpdated = async () => {
    await refreshEvent();
  };
  const handleGenreClick = (genre) => {
    navigate(`/events?genres=${genre}`);
  };
  const handleInstrumentClick = (instrument) => {
    navigate(`/events?instruments=${instrument}`);
  };
  const {
    availableInstruments,
    isSubmittingJoinRequest,
    isCancellingRequest,
    joinRequest,
    requestToCancel,
    setRequestToCancel,
    handleJoinRequest,
    handleCancelRequest,
    handleJoinRequestChange,
    resetJoinRequest,
  } = useJoinRequest(id, event, refreshEvent);
  const {
    requestActionLoading,
    statusMenuAnchorEl,
    activeStatusMenuRequest,
    handleRequestAction,
    handleStatusMenuOpen,
    handleStatusMenuClose,
    handleStatusChange,
  } = useRequestManagement(id, refreshEvent);
  const {
    joinDialogOpen,
    deleteConfirmOpen,
    cancelRequestConfirmOpen,
    editModalOpen,
    authModalOpen,
    setJoinDialogOpen,
    setDeleteConfirmOpen,
    setCancelRequestConfirmOpen,
    setEditModalOpen,
    setAuthModalOpen,
    openAuthModal,
    closeEditModal,
  } = useEventDialogs();
  const handleLikeWithAuth = async () => {
    const result = await handleLike();
    if (result?.needsAuth) {
      openAuthModal();
    }
  };
  const handleJoinRequestWithDialog = async () => {
    const result = await handleJoinRequest();
    if (result?.success) {
      setJoinDialogOpen(false);
      resetJoinRequest();
    }
  };
  const handleCancelRequestWithDialog = async () => {
    const result = await handleCancelRequest();
    if (result?.success) {
      setCancelRequestConfirmOpen(false);
      setRequestToCancel(null);
    }
  };
  const handleDeleteEventWithDialog = async () => {
    await handleDeleteEvent();
    setDeleteConfirmOpen(false);
  };
  const handleEventUpdatedWithModal = async () => {
    await handleEventUpdated();
    closeEditModal();
  };
  const handleCancelRequestClick = (request) => {
    setRequestToCancel(request);
    setCancelRequestConfirmOpen(true);
  };
  return {
    event,
    loading,
    error,
    availableInstruments,
    isSubmittingJoinRequest,
    requestActionLoading,
    isDeleting: false,
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
    handleLike: handleLikeWithAuth,
    handleJoinRequest: handleJoinRequestWithDialog,
    handleDeleteEvent: handleDeleteEventWithDialog,
    handleCancelRequest: handleCancelRequestWithDialog,
    handleEventUpdated: handleEventUpdatedWithModal,
    handleGenreClick,
    handleInstrumentClick,
    handleStatusMenuOpen,
    handleStatusMenuClose,
    handleStatusChange,
    handleCancelRequestClick,
    handleJoinRequestChange,
  };
};