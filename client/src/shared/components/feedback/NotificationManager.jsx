import React from "react";
import { useToast } from "../../hooks/useToast";
export const useNotificationManager = () => {
  const { showToast } = useToast();
  const notifications = {
    create: {
      success: (entityType) =>
        showToast(`${entityType} created successfully!`, "success"),
      error: (entityType, error) =>
        showToast(
          error?.message || `Failed to create ${entityType.toLowerCase()}`,
          "error"
        ),
    },
    read: {
      success: (entityType, count) => null,
      error: (entityType, error) =>
        showToast(
          error?.message || `Failed to load ${entityType.toLowerCase()}`,
          "error"
        ),
    },
    update: {
      success: (entityType) =>
        showToast(`${entityType} updated successfully!`, "success"),
      error: (entityType, error) =>
        showToast(
          error?.message || `Failed to update ${entityType.toLowerCase()}`,
          "error"
        ),
    },
    delete: {
      success: (entityType) =>
        showToast(`${entityType} deleted successfully!`, "success"),
      error: (entityType, error) =>
        showToast(
          error?.message || `Failed to delete ${entityType.toLowerCase()}`,
          "error"
        ),
    },
    auth: {
      loginSuccess: () => showToast("Login successful!", "success"),
      loginError: (error) =>
        showToast(error?.message || "Login failed", "error"),
      logoutSuccess: () => showToast("Logged out successfully", "success"),
      logoutError: (error) =>
        showToast(error?.message || "Logout failed", "error"),
      registerSuccess: () =>
        showToast(
          "Registration successful! Welcome to JamTogether!",
          "success"
        ),
      registerError: (error) =>
        showToast(error?.message || "Registration failed", "error"),
    },
    profile: {
      updateSuccess: () =>
        showToast("Profile updated successfully!", "success"),
      updateError: (error) =>
        showToast(error?.message || "Failed to update profile", "error"),
      pictureUploadSuccess: () =>
        showToast("Profile picture uploaded successfully!", "success"),
      pictureUploadError: (error) =>
        showToast(
          error?.message || "Failed to upload profile picture",
          "error"
        ),
      pictureDeleteSuccess: () =>
        showToast("Profile picture deleted successfully!", "success"),
      pictureDeleteError: (error) =>
        showToast(
          error?.message || "Failed to delete profile picture",
          "error"
        ),
    },
    events: {
      createSuccess: () => showToast("Event created successfully!", "success"),
      createError: (error) =>
        showToast(error?.message || "Failed to create event", "error"),
      updateSuccess: () => showToast("Event updated successfully!", "success"),
      updateError: (error) =>
        showToast(error?.message || "Failed to update event", "error"),
      deleteSuccess: () => showToast("Event deleted successfully!", "success"),
      deleteError: (error) =>
        showToast(error?.message || "Failed to delete event", "error"),
      joinSuccess: () =>
        showToast("Join request submitted successfully!", "success"),
      joinError: (error) =>
        showToast(error?.message || "Failed to submit join request", "error"),
      approveSuccess: (action) =>
        showToast(`Request ${action}d successfully!`, "success"),
      approveError: (error) =>
        showToast(error?.message || "Failed to update request", "error"),
      likeSuccess: (isLiked) =>
        showToast(
          isLiked ? "Added to favorites!" : "Removed from favorites!",
          "success"
        ),
      likeError: (error) =>
        showToast(error?.message || "Failed to update like status", "error"),
      loadError: (error) =>
        showToast(error?.message || "Failed to load events", "error"),
    },
    requests: {
      cancelSuccess: () =>
        showToast("Request cancelled successfully!", "success"),
      cancelError: (error) =>
        showToast(error?.message || "Failed to cancel request", "error"),
      loadError: (error) =>
        showToast(error?.message || "Failed to load requests", "error"),
    },
    admin: {
      userActionSuccess: (action) =>
        showToast(`User ${action} successfully`, "success"),
      userActionError: (error) =>
        showToast(error?.message || "Failed to perform user action", "error"),
      eventActionSuccess: (action) =>
        showToast(`Event ${action} successfully`, "success"),
      eventActionError: (error) =>
        showToast(error?.message || "Failed to perform event action", "error"),
      analyticsLoadError: (error) =>
        showToast(error?.message || "Failed to load analytics", "error"),
    },
    copy: {
      success: () => showToast("Link copied to clipboard!", "success"),
      error: () => showToast("Failed to copy link", "error"),
    },
    upload: {
      success: (type) => showToast(`${type} uploaded successfully!`, "success"),
      error: (type, error) =>
        showToast(
          error?.message || `Failed to upload ${type.toLowerCase()}`,
          "error"
        ),
    },
    network: {
      error: () =>
        showToast("Network error - please check your connection", "error"),
      timeout: () =>
        showToast("Request timed out - please try again", "warning"),
    },
    validation: {
      error: (message) => showToast(`Validation error: ${message}`, "error"),
      required: (field) => showToast(`${field} is required`, "warning"),
    },
    loading: {
      success: (operation) => showToast(`${operation} completed`, "success"),
    },
    batch: {
      success: (operation, count) =>
        showToast(
          `${operation} completed for ${count} item${count === 1 ? "" : "s"}`,
          "success"
        ),
      error: (operation, error) =>
        showToast(
          error?.message || `Failed to ${operation.toLowerCase()}`,
          "error"
        ),
    },
  };
  const showOperationResult = (
    operation,
    type,
    result,
    entityType = "Item"
  ) => {
    const notification = notifications[operation]?.[type];
    if (notification) {
      if (typeof notification === "function") {
        notification(result, entityType);
      } else {
        showToast(notification, type === "error" ? "error" : "success");
      }
    }
  };
  const withNotifications = (operation, entityType = "Item") => ({
    onSuccess: (result) =>
      showOperationResult(operation, "success", result, entityType),
    onError: (error) =>
      showOperationResult(operation, "error", error, entityType),
  });
  return {
    notifications,
    showOperationResult,
    withNotifications,
    showToast,
    showSuccess: (message) => showToast(message, "success"),
    showError: (message) => showToast(message, "error"),
    showWarning: (message) => showToast(message, "warning"),
  };
};
export const withNotifications = (Component) => {
  return function NotificationWrappedComponent(props) {
    const notificationManager = useNotificationManager();
    return <Component {...props} notifications={notificationManager} />;
  };
};
export const NotificationContext = React.createContext(null);
export const NotificationProvider = ({ children }) => {
  const notificationManager = useNotificationManager();
  return (
    <NotificationContext.Provider value={notificationManager}>
      {children}
    </NotificationContext.Provider>
  );
};
export const useNotifications = () => {
  const context = React.useContext(NotificationContext);
  if (!context) {
    return useNotificationManager();
  }
  return context;
};
export default useNotificationManager;