import { tokenManager } from "../../services/tokenManager";
import { extendSessionOnApiRequest } from "../../hooks/useSessionTimeout";
import { ApiClient } from "./apiClient";
class ApiAuth extends ApiClient {
  constructor() {
    super();
  }
  getToken = () => tokenManager.get();
  setToken = (token) => tokenManager.set(token);
  removeToken = () => tokenManager.remove();
  async handleAuthentication(config, endpoint) {
    const token = this.getToken();
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
      if (!endpoint.includes("/auth/")) {
        try {
          extendSessionOnApiRequest();
        } catch (error) {
          if (import.meta.env.DEV) {
            console.warn("Failed to extend session:", error);
          }
        }
      }
    }
    return config;
  }
  async authenticatedRequest(endpoint, options = {}) {
    return this.request(
      endpoint,
      options,
      this.handleAuthentication.bind(this)
    );
  }
  get(endpoint, options = {}) {
    return this.authenticatedRequest(endpoint, { ...options, method: "GET" });
  }
  post(endpoint, data, options = {}) {
    return this.authenticatedRequest(endpoint, {
      ...options,
      method: "POST",
      body: data instanceof FormData ? data : JSON.stringify(data),
    });
  }
  patch(endpoint, data, options = {}) {
    return this.authenticatedRequest(endpoint, {
      ...options,
      method: "PATCH",
      body: data instanceof FormData ? data : JSON.stringify(data),
    });
  }
  put(endpoint, data, options = {}) {
    return this.authenticatedRequest(endpoint, {
      ...options,
      method: "PUT",
      body: data instanceof FormData ? data : JSON.stringify(data),
    });
  }
  delete(endpoint, options = {}) {
    return this.authenticatedRequest(endpoint, {
      ...options,
      method: "DELETE",
    });
  }
  isAuthenticated() {
    return !!this.getToken();
  }
  logout() {
    this.removeToken();
  }
}
export { ApiAuth };