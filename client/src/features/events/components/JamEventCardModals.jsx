import React from "react";
import AuthModal from "../../auth/components/AuthModal";
import EditEventModal from "./EditEventModal";
import ConfirmationModal from "../../../shared/components/ui/ConfirmationModal";
export default function JamEventCardModals({
  authModalOpen,
  setAuthModalOpen,
  editModalOpen,
  setEditModalOpen,
  deleteConfirmOpen,
  setDeleteConfirmOpen,
  eventData,
  handleEventUpdated,
  handleDeleteEvent,
  isDeleting,
}) {
  return (
    <>
      <AuthModal open={authModalOpen} onClose={() => setAuthModalOpen(false)} />
      <EditEventModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        event={eventData}
        onEventUpdated={handleEventUpdated}
      />
      <ConfirmationModal
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteEvent}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={isDeleting}
        severity="error"
      />
    </>
  );
}