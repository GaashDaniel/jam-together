import { useState } from "react";
export const useEventDialogs = () => {
  const [joinDialogOpen, setJoinDialogOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [cancelRequestConfirmOpen, setCancelRequestConfirmOpen] =
    useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const openJoinDialog = () => setJoinDialogOpen(true);
  const closeJoinDialog = () => setJoinDialogOpen(false);
  const openDeleteConfirm = () => setDeleteConfirmOpen(true);
  const closeDeleteConfirm = () => setDeleteConfirmOpen(false);
  const openCancelRequestConfirm = () => setCancelRequestConfirmOpen(true);
  const closeCancelRequestConfirm = () => setCancelRequestConfirmOpen(false);
  const openEditModal = () => setEditModalOpen(true);
  const closeEditModal = () => setEditModalOpen(false);
  const openAuthModal = () => setAuthModalOpen(true);
  const closeAuthModal = () => setAuthModalOpen(false);
  const closeAllDialogs = () => {
    setJoinDialogOpen(false);
    setDeleteConfirmOpen(false);
    setCancelRequestConfirmOpen(false);
    setEditModalOpen(false);
    setAuthModalOpen(false);
  };
  return {
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
    openJoinDialog,
    closeJoinDialog,
    openDeleteConfirm,
    closeDeleteConfirm,
    openCancelRequestConfirm,
    closeCancelRequestConfirm,
    openEditModal,
    closeEditModal,
    openAuthModal,
    closeAuthModal,
    closeAllDialogs,
  };
};