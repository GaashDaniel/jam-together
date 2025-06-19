import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { authService } from "../services/auth";
import { useToast } from "../hooks/useToast";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError } = useToast();

  const isCheckingAuthRef = useRef(false);
  const hasCheckedAuthRef = useRef(false);

  const checkAuth = useCallback(async () => {
    if (isCheckingAuthRef.current || hasCheckedAuthRef.current) {
      return;
    }

    isCheckingAuthRef.current = true;

    try {
      if (authService.isAuthenticated()) {
        const response = await authService.getMe();
        setUser(response.user);
      } else {
        setUser(null);
      }
      hasCheckedAuthRef.current = true;
    } catch (error) {
      authService.logout();
      setUser(null);
      hasCheckedAuthRef.current = true;
      if (
        error.message.includes("401") ||
        error.message.includes("unauthorized") ||
        error.message.includes("token") ||
        error.message.includes("expired")
      ) {
        showError("Session expired - please log in again");
      }
    } finally {
      setLoading(false);
      isCheckingAuthRef.current = false;
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, []);

  const login = useCallback(
    async (credentials) => {
      try {
        const response = await authService.login(credentials);
        setUser(response.user);
        showSuccess("Login successful!");
        return { success: true };
      } catch (error) {
        showError(error.message || "Login failed");
        return { success: false, error: error.message };
      }
    },
    [showSuccess, showError]
  );

  const register = useCallback(
    async (userData) => {
      try {
        const response = await authService.register(userData);
        setUser(response.user);
        showSuccess("Registration successful! Welcome to JamTogether!");
        return { success: true };
      } catch (error) {
        showError(error.message || "Registration failed");
        return { success: false, error: error.message };
      }
    },
    [showSuccess, showError]
  );

  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setUser(null);
      showSuccess("Logged out successfully");
    } catch (error) {
      setUser(null);
      showError("Logout request failed, but you have been logged out locally");
    }
  }, [showSuccess, showError]);

  const updateProfile = useCallback(
    async (profileData) => {
      try {
        const response = await authService.updateProfile(profileData);
        setUser(response.user);
        showSuccess("Profile updated successfully");
        return { success: true };
      } catch (error) {
        showError(error.message || "Update failed");
        return { success: false, error: error.message };
      }
    },
    [showSuccess, showError]
  );

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
    checkAuth,
    isAuthenticated: authService.isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
