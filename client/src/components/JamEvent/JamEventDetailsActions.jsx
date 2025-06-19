import React from "react";
import { Menu, MenuItem } from "@mui/material";
import ConfirmationModal from "../../shared/components/ui/ConfirmationModal";
import EditEventModal from "./EditEventModal";
import AuthModal from "../../features/auth/components/AuthModal";
import JamEventJoinDialog from "./JamEventJoinDialog";
const JamEventDetailsActions = ({
  joinDialogOpen,
  deleteConfirmOpen,
  cancelRequestConfirmOpen,
  editModalOpen,
  authModalOpen,
  statusMenuAnchorEl,
  activeStatusMenuRequest,
  event,
  user,
  joinRequest,
  availableInstruments,
  requestToCancel,
  isSubmittingJoinRequest,
  isDeleting,
  isCancellingRequest,
  onJoinDialogClose,
  onDeleteConfirmClose,
  onCancelRequestConfirmClose,
  onEditModalClose,
  onAuthModalClose,
  onStatusMenuClose,
  onJoinRequestChange,
  onJoinRequest,
  onDeleteEvent,
  onCancelRequest,
  onEventUpdated,
  onStatusChange,
}) => {
  return (
    <>
      <JamEventJoinDialog
        open={joinDialogOpen}
        onClose={onJoinDialogClose}
        user={user}
        joinRequest={joinRequest}
        availableInstruments={availableInstruments}
        isSubmittingJoinRequest={isSubmittingJoinRequest}
        onJoinRequestChange={onJoinRequestChange}
        onJoinRequest={onJoinRequest}
      />
      {}
      <ConfirmationModal
        open={deleteConfirmOpen}
        onClose={onDeleteConfirmClose}
        onConfirm={onDeleteEvent}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        loading={isDeleting}
        severity="error"
      />
      {}
      <ConfirmationModal
        open={cancelRequestConfirmOpen}
        onClose={onCancelRequestConfirmClose}
        onConfirm={onCancelRequest}
        title="Cancel Request"
        message="Are you sure you want to cancel your join request?"
        confirmText="Cancel Request"
        cancelText="Keep Request"
        loading={isCancellingRequest}
        severity="warning"
      />
      {}
      <EditEventModal
        open={editModalOpen}
        onClose={onEditModalClose}
        event={event}
        onEventUpdated={onEventUpdated}
      />
      {}
      <AuthModal open={authModalOpen} onClose={onAuthModalClose} />
      {}
      <Menu
        anchorEl={statusMenuAnchorEl[activeStatusMenuRequest]}
        open={Boolean(statusMenuAnchorEl[activeStatusMenuRequest])}
        onClose={() => onStatusMenuClose(activeStatusMenuRequest)}
      >
        <MenuItem
          onClick={() => onStatusChange(activeStatusMenuRequest, "approved")}
        >
          Approve
        </MenuItem>
        <MenuItem
          onClick={() => onStatusChange(activeStatusMenuRequest, "rejected")}
        >
          Reject
        </MenuItem>
        <MenuItem
          onClick={() => onStatusChange(activeStatusMenuRequest, "pending")}
        >
          Set to Pending
        </MenuItem>
      </Menu>
    </>
  );
};
export default JamEventDetailsActions;