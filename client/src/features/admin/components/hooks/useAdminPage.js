import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../features/auth/hooks/useAuth";
import { useAdminData } from "./useAdminData";
import { useAdminActions } from "./useAdminActions";
import { useAdminFiltersAndSelections } from "./useAdminFiltersAndSelections";
import { useAdminDialogs } from "./useAdminDialogs";
export const useAdminPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { loading, stats, users, events, fetchAdminData } = useAdminData();
  const {
    actionLoading,
    handleUserAction,
    handleEventAction,
    handleBulkAction,
  } = useAdminActions(fetchAdminData);
  const {
    tabValue,
    handleTabChange,
    filters,
    filteredUsers,
    filteredEvents,
    handleFilterChange,
    selectedUsers,
    selectedEvents,
    handleUserSelection,
    handleEventSelection,
    handleSelectAllUsers,
    handleSelectAllEvents,
    clearAllSelections,
  } = useAdminFiltersAndSelections(users, events);
  const {
    actionDialog,
    openActionDialog,
    closeActionDialog,
    updateActionDialogReason,
    bulkDialog,
    openBulkDialog,
    closeBulkDialog,
  } = useAdminDialogs();
  const handleConfirmAction = async () => {
    try {
      if (actionDialog.item?.username) {
        await handleUserAction(
          actionDialog.item._id,
          actionDialog.type,
          actionDialog.reason
        );
      } else {
        await handleEventAction(
          actionDialog.item._id,
          actionDialog.type,
          actionDialog.reason
        );
      }
      closeActionDialog();
    } catch (error) {}
  };
  const handleConfirmBulkAction = async () => {
    try {
      await handleBulkAction(bulkDialog.type, bulkDialog.items);
      closeBulkDialog();
      clearAllSelections();
    } catch (error) {}
  };
  const navigationHandlers = {
    onViewProfile: (username) => navigate(`/profile/${username}`),
    onViewEvent: (eventId) => navigate(`/events/${eventId}`),
  };
  const actionHandlers = {
    onPromoteUser: (user) => openActionDialog("promote", user),
    onDemoteUser: (user) => openActionDialog("demote", user),
    onDeleteUser: (user) => openActionDialog("delete", user),
    onDeleteEvent: (event) => openActionDialog("delete", event),
    onBulkAction: openBulkDialog,
  };
  return {
    user,
    navigate,
    loading,
    stats,
    users,
    events,
    actionLoading,
    filteredUsers,
    filteredEvents,
    tabValue,
    handleTabChange,
    filters,
    handleFilterChange,
    selectedUsers,
    selectedEvents,
    handleUserSelection,
    handleEventSelection,
    handleSelectAllUsers,
    handleSelectAllEvents,
    actionDialog,
    bulkDialog,
    closeActionDialog,
    closeBulkDialog,
    updateActionDialogReason,
    handleConfirmAction,
    handleConfirmBulkAction,
    ...navigationHandlers,
    ...actionHandlers,
  };
};
