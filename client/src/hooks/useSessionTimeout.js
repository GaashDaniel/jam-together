import { useEffect, useRef, useCallback } from "react";
import { useAuth } from "./useAuth";
import { useToast } from "./useToast";
const SESSION_TIMEOUT = 4 * 60 * 60 * 1000;
const WARNING_TIME = 5 * 60 * 1000;
const ACTIVITY_EVENTS = [
  "mousedown",
  "mousemove",
  "keypress",
  "scroll",
  "touchstart",
  "click",
];
const API_REQUEST_EXTENSION_INTERVAL = 10 * 60 * 1000;
let lastApiExtensionTime = 0;
let globalExtendSession = null;
export const useSessionTimeout = () => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const timeoutRef = useRef(null);
  const warningTimeoutRef = useRef(null);
  const warningShownRef = useRef(false);
  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
    }
    warningShownRef.current = false;
    if (!user) return;
    warningTimeoutRef.current = setTimeout(() => {
      if (!warningShownRef.current) {
        warningShownRef.current = true;
        showToast(
          "Your session will expire in 5 minutes due to inactivity. Click anywhere to stay logged in.",
          "warning",
          8000
        );
      }
    }, SESSION_TIMEOUT - WARNING_TIME);
    timeoutRef.current = setTimeout(() => {
      showToast(
        "Session expired due to inactivity. Please log in again.",
        "warning"
      );
      logout();
    }, SESSION_TIMEOUT);
  }, [user, logout, showToast]);
  const resetTimeoutOnActivity = useCallback(() => {
    if (user && !warningShownRef.current) {
      resetTimeout();
    } else if (user && warningShownRef.current) {
      showToast(
        "Session extended. You will remain logged in.",
        "success",
        3000
      );
      resetTimeout();
    }
  }, [user, resetTimeout]);
  const extendSessionOnApiRequest = useCallback(() => {
    const now = Date.now();
    if (user && now - lastApiExtensionTime > API_REQUEST_EXTENSION_INTERVAL) {
      lastApiExtensionTime = now;
      resetTimeout();
      if (warningShownRef.current) {
        showToast("Session extended due to activity.", "success", 2000);
      }
    }
  }, [user, resetTimeout, showToast]);
  useEffect(() => {
    if (!user) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
      globalExtendSession = null;
      lastApiExtensionTime = 0;
      return;
    }
    resetTimeout();
    globalExtendSession = extendSessionOnApiRequest;
    ACTIVITY_EVENTS.forEach((event) => {
      document.addEventListener(event, resetTimeoutOnActivity, true);
    });
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
      ACTIVITY_EVENTS.forEach((event) => {
        document.removeEventListener(event, resetTimeoutOnActivity, true);
      });
    };
  }, [user, resetTimeout, resetTimeoutOnActivity, extendSessionOnApiRequest]);
  const extendSession = useCallback(() => {
    if (user) {
      resetTimeout();
      showToast("Session extended successfully", "success");
    }
  }, [user, resetTimeout, showToast]);
  return {
    extendSession,
    extendSessionOnApiRequest,
    isSessionActive: !!user,
  };
};
export const extendSessionOnApiRequest = () => {
  if (globalExtendSession) {
    globalExtendSession();
  }
};