import { useCallback } from "react";
import { toast } from "react-toastify";
export const useToast = () => {
  const showSuccess = useCallback((message) => {
    toast.success(message);
  }, []);
  const showError = useCallback((message) => {
    toast.error(message);
  }, []);
  const showWarning = useCallback((message) => {
    toast.warning(message);
  }, []);
  const showToast = useCallback((message, type = "success") => {
    switch (type) {
      case "success":
        toast.success(message);
        break;
      case "error":
        toast.error(message);
        break;
      case "warning":
        toast.warning(message);
        break;
      default:
        toast.success(message);
        break;
    }
  }, []);
  return {
    showSuccess,
    showError,
    showWarning,
    showToast,
  };
};