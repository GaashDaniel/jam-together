import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast";
import api from "../../../services/api";
export const useProfile = (username) => {
  const { user: currentUser } = useAuth();
  const { showToast } = useToast();
  const [user, setUser] = useState(null);
  const [userEvents, setUserEvents] = useState([]);
  const [joinRequests, setJoinRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [cancellingRequestId, setCancellingRequestId] = useState(null);
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);
  const [requestToCancel, setRequestToCancel] = useState(null);
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const isOwnProfile = currentUser && currentUser.username === username;
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const userData = await api.get(`/users/profile/${username}`);
      setUser(userData.user);
      setUserEvents(userData.user.events || []);
      if (isOwnProfile) {
        try {
          const requestsData = await api.get("/joinRequests/my-requests");
          setJoinRequests(requestsData.requests || []);
        } catch (requestsErr) {
          console.error("Error fetching join requests:", requestsErr);
        }
      }
    } catch (err) {
      if (err.response?.status === 404) {
        setError("User not found");
      } else {
        setError(err.message || "Failed to fetch user profile");
      }
      showToast(err.message || "Failed to fetch user profile", "error");
    } finally {
      setLoading(false);
    }
  };
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleCancelClick = (request) => {
    setRequestToCancel(request);
    setCancelConfirmOpen(true);
  };
  const handleCancelRequest = async () => {
    if (!requestToCancel) return;
    try {
      setCancellingRequestId(requestToCancel._id);
      await api.delete(`/joinRequests/${requestToCancel._id}`);
      setJoinRequests((prevRequests) =>
        prevRequests.filter((req) => req._id !== requestToCancel._id)
      );
      showToast("Request cancelled successfully", "success");
    } catch (error) {
      showToast(error.message || "Failed to cancel request", "error");
    } finally {
      setCancellingRequestId(null);
      setCancelConfirmOpen(false);
      setRequestToCancel(null);
    }
  };
  const handleEditProfileOpen = () => {
    setEditProfileOpen(true);
  };
  const handleEditProfileClose = () => {
    setEditProfileOpen(false);
    fetchUserProfile();
  };
  useEffect(() => {
    fetchUserProfile();
  }, [username]);
  return {
    user,
    userEvents,
    joinRequests,
    loading,
    error,
    tabValue,
    cancellingRequestId,
    cancelConfirmOpen,
    requestToCancel,
    editProfileOpen,
    isOwnProfile,
    handleTabChange,
    handleCancelClick,
    handleCancelRequest,
    handleEditProfileOpen,
    handleEditProfileClose,
    setCancelConfirmOpen,
    fetchUserProfile,
  };
};