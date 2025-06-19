import { useState } from "react";
import adminService from "../../../../services/admin";
import { useToast } from "../../../../shared/hooks/useToast";
export const useAdminActions = (onDataChange) => {
  const { showToast } = useToast();
  const [actionLoading, setActionLoading] = useState(false);
  const handleUserAction = async (userId, action, reason = "") => {
    try {
      setActionLoading(true);
      let result;
      switch (action) {
        case "promote":
          result = await adminService.promoteUser(userId);
          break;
        case "demote":
          result = await adminService.demoteUser(userId);
          break;
        case "delete":
          result = await adminService.deleteUser(userId);
          break;
        default:
          throw new Error(`Unknown user action: ${action}`);
      }
      if (onDataChange) onDataChange();
      showToast(result.message || `User ${action}d successfully`, "success");
      return result;
    } catch (error) {
      showToast(`Failed to ${action} user: ${error.message}`, "error");
      console.error(`User ${action} error:`, error);
      throw error;
    } finally {
      setActionLoading(false);
    }
  };
  const handleEventAction = async (eventId, action, reason = "") => {
    try {
      setActionLoading(true);
      let result;
      switch (action) {
        case "delete":
          result = await adminService.deleteEvent(eventId);
          break;
        default:
          throw new Error(`Unknown event action: ${action}`);
      }
      if (onDataChange) onDataChange();
      showToast(result.message || `Event ${action}d successfully`, "success");
      return result;
    } catch (error) {
      showToast(`Failed to ${action} event: ${error.message}`, "error");
      console.error(`Event ${action} error:`, error);
      throw error;
    } finally {
      setActionLoading(false);
    }
  };
  const handleBulkAction = async (action, items, reason = "") => {
    try {
      setActionLoading(true);
      const result = await adminService.batchOperation(action, items, {
        reason,
      });
      if (result.successCount > 0) {
        showToast(
          `${result.successCount} items processed successfully`,
          "success"
        );
      }
      if (result.errorCount > 0) {
        showToast(`${result.errorCount} items failed to process`, "warning");
      }
      if (onDataChange) onDataChange();
      return result;
    } catch (error) {
      showToast(`Bulk ${action} failed: ${error.message}`, "error");
      console.error(`Bulk ${action} error:`, error);
      throw error;
    } finally {
      setActionLoading(false);
    }
  };
  const promoteUser = async (userId, reason) => {
    return handleUserAction(userId, "promote", reason);
  };
  const demoteUser = async (userId, reason) => {
    return handleUserAction(userId, "demote", reason);
  };
  const deleteUser = async (userId, reason) => {
    return handleUserAction(userId, "delete", reason);
  };
  const deleteEvent = async (eventId, reason) => {
    return handleEventAction(eventId, "delete", reason);
  };
  return {
    actionLoading,
    handleUserAction,
    handleEventAction,
    handleBulkAction,
    promoteUser,
    demoteUser,
    deleteUser,
    deleteEvent,
  };
};