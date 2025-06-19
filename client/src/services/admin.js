import api from "./api";
class AdminService {
  async getUsers(params = {}) {
    try {
      const queryString = new URLSearchParams({
        page: params.page || 1,
        limit: params.limit || 20,
        ...(params.search && { search: params.search }),
        ...(params.role && { role: params.role }),
        ...(params.status && { status: params.status }),
        ...(params.sortBy && { sortBy: params.sortBy }),
        ...(params.sortOrder && { sortOrder: params.sortOrder }),
      }).toString();
      return await api.get(`/admin/users?${queryString}`);
    } catch (error) {
      throw new Error(error.message || "Failed to fetch users");
    }
  }
  async getUserDetails(userId) {
    try {
      return await api.get(`/admin/users/${userId}`);
    } catch (error) {
      throw new Error(error.message || "Failed to fetch user details");
    }
  }
  async promoteUser(userId) {
    try {
      return await api.patch(`/admin/users/${userId}/promote`);
    } catch (error) {
      throw new Error(error.message || "Failed to promote user");
    }
  }
  async demoteUser(userId) {
    try {
      return await api.patch(`/admin/users/${userId}/demote`);
    } catch (error) {
      throw new Error(error.message || "Failed to demote user");
    }
  }
  async updateUser(userId, updates) {
    try {
      return await api.patch(`/admin/users/${userId}`, updates);
    } catch (error) {
      throw new Error(error.message || "Failed to update user");
    }
  }
  async deleteUser(userId) {
    try {
      return await api.delete(`/admin/users/${userId}`);
    } catch (error) {
      throw new Error(error.message || "Failed to delete user");
    }
  }
  async searchUsersByEmail(email, limit = 10) {
    try {
      const queryString = new URLSearchParams({
        email,
        limit,
      }).toString();
      return await api.get(`/admin/users/search/email?${queryString}`);
    } catch (error) {
      throw new Error(error.message || "Failed to search users by email");
    }
  }
  async getEvents(params = {}) {
    try {
      const queryString = new URLSearchParams({
        page: params.page || 1,
        limit: params.limit || 20,
        ...(params.search && { search: params.search }),
        ...(params.status && { status: params.status }),
        ...(params.sortBy && { sortBy: params.sortBy }),
        ...(params.sortOrder && { sortOrder: params.sortOrder }),
      }).toString();
      return await api.get(`/admin/events?${queryString}`);
    } catch (error) {
      throw new Error(error.message || "Failed to fetch events");
    }
  }
  async getEventDetails(eventId) {
    try {
      return await api.get(`/admin/events/${eventId}`);
    } catch (error) {
      throw new Error(error.message || "Failed to fetch event details");
    }
  }
  async flagEvent(eventId, reason = "") {
    try {
      return await api.patch(`/admin/events/${eventId}`, {
        action: "flag",
        reason,
      });
    } catch (error) {
      throw new Error(error.message || "Failed to flag event");
    }
  }
  async unflagEvent(eventId) {
    try {
      return await api.patch(`/admin/events/${eventId}`, {
        action: "unflag",
      });
    } catch (error) {
      throw new Error(error.message || "Failed to unflag event");
    }
  }
  async cancelEvent(eventId, reason = "") {
    try {
      return await api.patch(`/admin/events/${eventId}`, {
        action: "cancel",
        reason,
      });
    } catch (error) {
      throw new Error(error.message || "Failed to cancel event");
    }
  }
  async deleteEvent(eventId) {
    try {
      return await api.delete(`/admin/events/${eventId}`);
    } catch (error) {
      throw new Error(error.message || "Failed to delete event");
    }
  }
  async getStats() {
    try {
      return await api.get("/admin/stats");
    } catch (error) {
      throw new Error(error.message || "Failed to fetch admin statistics");
    }
  }
  async getActivity() {
    try {
      return await api.get("/admin/activity");
    } catch (error) {
      throw new Error(error.message || "Failed to fetch admin activity");
    }
  }
  async validateAdminAccess() {
    try {
      await this.getStats();
      return true;
    } catch (error) {
      return false;
    }
  }
  async batchOperation(operation, items, options = {}) {
    try {
      const results = [];
      const errors = [];
      for (const item of items) {
        try {
          let result;
          switch (operation) {
            case "deleteUser":
              result = await this.deleteUser(item.id);
              break;
            case "promoteUser":
              result = await this.promoteUser(item.id);
              break;
            case "demoteUser":
              result = await this.demoteUser(item.id);
              break;
            case "deleteEvent":
              result = await this.deleteEvent(item.id);
              break;
            case "flagEvent":
              result = await this.flagEvent(item.id, options.reason);
              break;
            default:
              throw new Error(`Unknown batch operation: ${operation}`);
          }
          results.push({ item, result, success: true });
        } catch (error) {
          errors.push({ item, error: error.message, success: false });
        }
      }
      return {
        successful: results,
        failed: errors,
        totalProcessed: items.length,
        successCount: results.length,
        errorCount: errors.length,
      };
    } catch (error) {
      throw new Error(error.message || "Batch operation failed");
    }
  }
}
const adminService = new AdminService();
export default adminService;