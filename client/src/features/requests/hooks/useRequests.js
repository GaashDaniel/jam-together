import { useState, useEffect, useMemo } from "react";
import { api } from "../../../services/api";
import { useToast } from "../../../hooks/useToast";
export const useRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { showToast } = useToast();
  const fetchRequests = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/joinRequests/my-requests");
      setRequests(response.requests || []);
    } catch (err) {
      const errorMessage = err.message || "Failed to load join requests";
      setError(errorMessage);
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };
  const refreshRequests = async () => {
    try {
      const response = await api.get("/joinRequests/my-requests");
      setRequests(response.requests || []);
      showToast("Requests refreshed", "success");
    } catch (err) {
      showToast(err.message || "Failed to refresh requests", "error");
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  return {
    requests,
    loading,
    error,
    refreshRequests,
    setRequests,
  };
};
