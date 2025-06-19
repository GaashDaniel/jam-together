import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import { useToast } from "./useToast";
import { api } from "../services/api";
export const useUnifiedEventCard = ({
  jamEvent,
  joinRequest,
  type,
  onEdit,
  onDelete,
  onCancel,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [likes, setLikes] = useState(jamEvent?.likes || []);
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const eventData = type === "event" ? jamEvent : joinRequest?.jamEvent;
  const isLiked = user && likes.includes(user._id);
  const requestCount =
    eventData?.requestCount || eventData?.requests?.length || 0;
  const isPastEvent = eventData
    ? new Date(eventData.scheduledTo) <= new Date()
    : false;
  const isOwner =
    user &&
    eventData?.createdBy &&
    (eventData.createdBy._id === user._id || eventData.createdBy === user._id);
  const handleCardClick = (e) => {
    if (
      e.target.closest(".MuiIconButton-root") ||
      e.target.closest(".MuiButton-root")
    ) {
      return;
    }
    if (eventData) {
      navigate(`/events/${eventData._id}`);
    }
  };
  const handleLike = async (e) => {
    e.stopPropagation();
    if (!user) {
      setAuthModalOpen(true);
      return;
    }
    if (isLikeLoading || type !== "event") return;
    try {
      setIsLikeLoading(true);
      const newLikes = isLiked
        ? likes.filter((id) => id !== user._id)
        : [...likes, user._id];
      setLikes(newLikes);
      await api.post(`/jamEvents/${jamEvent._id}/like`);
      showToast(
        isLiked ? "Removed from favorites" : "Added to favorites",
        "success"
      );
    } catch (error) {
      setLikes(likes);
      showToast("Failed to update favorites", "error");
    } finally {
      setIsLikeLoading(false);
    }
  };
  const handleMenuOpen = (e) => {
    e.stopPropagation();
    setMenuAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };
  const handleEdit = () => {
    handleMenuClose();
    if (onEdit) {
      onEdit(eventData);
    }
  };
  const handleDelete = () => {
    handleMenuClose();
    if (onDelete) {
      onDelete(eventData);
    }
  };
  const handleViewDetails = (e) => {
    e.stopPropagation();
    if (eventData) {
      navigate(`/events/${eventData._id}`);
    }
  };
  const handleViewEvent = () => {
    handleMenuClose();
    if (eventData) {
      navigate(`/events/${eventData._id}`);
    }
  };
  const handleCancelRequest = () => {
    if (onCancel && joinRequest) {
      onCancel(joinRequest);
    }
  };
  const handleViewRequests = (e) => {
    e.stopPropagation();
    navigate(`/events/${eventData._id}/requests`);
  };
  const getTitleFontSize = (title) => {
    const titleLength = title.length;
    const estimatedCharsPerLine = 18;
    const estimatedLines = Math.ceil(titleLength / estimatedCharsPerLine);
    return estimatedLines > 2 ? "1rem" : "1.25rem";
  };
  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "success";
      case "denied":
        return "error";
      default:
        return "warning";
    }
  };
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  return {
    likes,
    isLikeLoading,
    authModalOpen,
    setAuthModalOpen,
    menuAnchorEl,
    eventData,
    isLiked,
    requestCount,
    isPastEvent,
    isOwner,
    handleCardClick,
    handleLike,
    handleMenuOpen,
    handleMenuClose,
    handleEdit,
    handleDelete,
    handleViewDetails,
    handleViewEvent,
    handleCancelRequest,
    handleViewRequests,
    getTitleFontSize,
    getStatusColor,
    formatDate,
  };
};