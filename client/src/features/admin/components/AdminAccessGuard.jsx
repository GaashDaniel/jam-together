import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";
import LoadingSpinner from "../../../shared/components/ui/LoadingSpinner";
export default function AdminAccessGuard({ children }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
      return;
    }
  }, [user, navigate]);
  if (!user || user.role !== "admin") {
    return null;
  }
  return <>{children}</>;
}
