import api from "./api";

export const authService = {
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    if (response.token) {
      api.setToken(response.token);
    }
    return response;
  },

  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    if (response.token) {
      api.setToken(response.token);
    }
    return response;
  },

  logout: async () => {
    try {
      await api.post("/auth/logout", {}, { maxRetries: 0 });
    } finally {
      api.removeToken();
    }
  },

  getMe: () => api.get("/auth/me"),

  updateProfile: (profileData) => api.put("/auth/me", profileData),

  isAuthenticated: () => {
    return !!api.getToken();
  },

  getToken: () => {
    return api.getToken();
  },
};
