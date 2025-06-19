import { useState, useEffect } from "react";
import { useToast } from "../../../hooks/useToast";
import { api } from "../../../services/api";
export const useEventData = (id) => {
  const { showToast } = useToast();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      const data = await api.get(`/jamEvents/${id}`);
      setEvent(data.jamEvent);
    } catch (error) {
      setError(error.message);
      showToast("Failed to load event details", "error");
    } finally {
      setLoading(false);
    }
  };
  const refreshEvent = async () => {
    await fetchEventDetails();
  };
  useEffect(() => {
    if (id) {
      fetchEventDetails();
    }
  }, [id]);
  return {
    event,
    setEvent,
    loading,
    error,
    refreshEvent,
  };
};