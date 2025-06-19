import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import { useToast } from "../../../shared/hooks/useToast";
import { api } from "../../../shared/services";
export const useJamEventCard = (jamEvent, onEdit, onDelete) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { showToast } = useToast();
  const [eventData, setEventData] = useState(jamEvent || {});
  const [likes, setLikes] = useState(jamEvent?.likes || []);
  const [isLoading, setIsLoading] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  useEffect(() => {
    if (jamEvent) {
      setEventData(jamEvent);
      setLikes(jamEvent.likes || []);
    }
  }, [jamEvent]);
  const isLiked = user && likes.includes(user._id);
  const requestCount =
    eventData?.requestCount || eventData?.requests?.length || 0;
  const isPastEvent = eventData?.scheduledTo
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
    if (eventData?._id) {
      navigate(`/events/${eventData._id}`);
    }
  };
  const handleLike = async (e) => {
    e.stopPropagation();
    if (!user) {
      setEditModalOpen(false);
      setDeleteConfirmOpen(false);
      setAuthModalOpen(true);
      return;
    }
    if (!user._id) {
      showToast("Authentication error - please log in again", "error");
      return;
    }
    if (isLoading || !eventData?._id) return;
    try {
      setIsLoading(true);
      const newLikes = isLiked
        ? likes.filter((id) => id !== user._id)
        : [...likes, user._id];
      setLikes(newLikes);
      await api.post(`/jamEvents/${eventData._id}/like`);
      showToast(
        isLiked ? "Removed from favorites!" : "Added to favorites!",
        "success"
      );
    } catch (error) {
      showToast(`Failed to update like status: ${error.message}`, "error");
      setLikes(likes);
    } finally {
      setIsLoading(false);
    }
  };
  const handleViewDetails = (e) => {
    e.stopPropagation();
    if (eventData?._id) {
      navigate(`/events/${eventData._id}`);
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
    setAuthModalOpen(false);
    setDeleteConfirmOpen(false);
    setEditModalOpen(true);
  };
  const handleDelete = () => {
    handleMenuClose();
    setAuthModalOpen(false);
    setEditModalOpen(false);
    setDeleteConfirmOpen(true);
  };
  const handleDeleteEvent = async () => {
    if (!eventData?._id) return;
    try {
      setIsDeleting(true);
      await api.delete(`/jamEvents/${eventData._id}`);
      showToast("Event deleted successfully", "success");
      setDeleteConfirmOpen(false);
      if (onDelete) {
        onDelete(eventData);
      }
    } catch (error) {
      showToast(error.message || "Failed to delete event", "error");
    } finally {
      setIsDeleting(false);
    }
  };
  const handleEventUpdated = (updatedEvent) => {
    if (updatedEvent) {
      setEventData(updatedEvent);
      setLikes(updatedEvent.likes || []);
    }
    setEditModalOpen(false);
    if (onEdit && updatedEvent) {
      onEdit(updatedEvent);
    }
  };
  return {
    eventData,
    likes,
    isLoading,
    authModalOpen,
    menuAnchorEl,
    editModalOpen,
    deleteConfirmOpen,
    isDeleting,
    user,
    isLiked,
    requestCount,
    isPastEvent,
    isOwner,
    handleCardClick,
    handleLike,
    handleViewDetails,
    handleMenuOpen,
    handleMenuClose,
    handleEdit,
    handleDelete,
    handleDeleteEvent,
    handleEventUpdated,
    setAuthModalOpen,
    setEditModalOpen,
    setDeleteConfirmOpen,
  };
};
