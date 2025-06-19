import { useState, useEffect } from "react";
import adminService from "../../../../services/admin";
import { useToast } from "../../../../shared/hooks/useToast";
export const useAdminData = () => {
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [statsData, usersData, eventsData] = await Promise.all([
        adminService.getStats(),
        adminService.getUsers({ limit: 50 }),
        adminService.getEvents({ limit: 50 }),
      ]);
      setStats(statsData);
      setUsers(usersData.users || []);
      setEvents(eventsData.events || []);
    } catch (error) {
      setError(error.message || "Failed to load admin data");
      showToast(error.message || "Failed to load admin data", "error");
    } finally {
      setLoading(false);
    }
  };
  const refreshData = async (type = "all") => {
    try {
      setLoading(true);
      if (type === "all") {
        await fetchAdminData();
        return;
      }
      switch (type) {
        case "stats":
          const statsData = await adminService.getStats();
          setStats(statsData);
          break;
        case "users":
          const usersData = await adminService.getUsers({ limit: 50 });
          setUsers(usersData.users || []);
          break;
        case "events":
          const eventsData = await adminService.getEvents({ limit: 50 });
          setEvents(eventsData.events || []);
          break;
        default:
          throw new Error(`Unknown data type: ${type}`);
      }
    } catch (error) {
      setError(error.message || `Failed to refresh ${type} data`);
      showToast(error.message || `Failed to refresh ${type} data`, "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAdminData();
  }, []);
  return {
    loading,
    stats,
    users,
    events,
    error,
    fetchAdminData,
    refreshData,
  };
};