import { useState, useEffect } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast";
import { api } from "../../../services/api";
export const useJoinRequest = (id, event, refreshEvent) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [availableInstruments, setAvailableInstruments] = useState([]);
  const [isSubmittingJoinRequest, setIsSubmittingJoinRequest] = useState(false);
  const [isCancellingRequest, setIsCancellingRequest] = useState(false);
  const [joinRequest, setJoinRequest] = useState({
    instrument: "",
    content: "",
  });
  const [requestToCancel, setRequestToCancel] = useState(null);
  const fetchAvailableInstruments = async () => {
    if (!user || !id) return;
    try {
      const data = await api.get(`/jamEvents/${id}/available-instruments`);
      setAvailableInstruments(data.instruments);
    } catch (error) {
    }
  };
  const handleJoinRequest = async () => {
    try {
      setIsSubmittingJoinRequest(true);
      const payload = {
        instrument: {
          instrument: joinRequest.instrument,
        },
        content: joinRequest.content,
      };
      await api.post(`/jamEvents/${id}/join`, payload);
      setJoinRequest({ instrument: "", content: "" });
      refreshEvent();
      showToast("Join request submitted!", "success");
      return { success: true };
    } catch (error) {
      showToast(error.message, "error");
      return { success: false, error: error.message };
    } finally {
      setIsSubmittingJoinRequest(false);
    }
  };
  const handleCancelRequest = async () => {
    if (!requestToCancel) return;
    try {
      setIsCancellingRequest(true);
      await api.delete(`/joinRequests/${requestToCancel._id}`);
      refreshEvent();
      showToast("Request cancelled successfully", "success");
      return { success: true };
    } catch (error) {
      showToast(error.message, "error");
      return { success: false, error: error.message };
    } finally {
      setIsCancellingRequest(false);
      setRequestToCancel(null);
    }
  };
  const handleJoinRequestChange = (field, value) => {
    setJoinRequest((prev) => ({ ...prev, [field]: value }));
  };
  const resetJoinRequest = () => {
    setJoinRequest({ instrument: "", content: "" });
  };
  useEffect(() => {
    if (event && user) {
      fetchAvailableInstruments();
    }
  }, [event, user]);
  return {
    availableInstruments,
    isSubmittingJoinRequest,
    isCancellingRequest,
    joinRequest,
    requestToCancel,
    setRequestToCancel,
    handleJoinRequest,
    handleCancelRequest,
    handleJoinRequestChange,
    resetJoinRequest,
  };
};