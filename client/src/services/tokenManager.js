import { TOKEN_STORAGE_KEY } from "./apiConstants";
export const tokenManager = {
  get() {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  },
  set(token) {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  },
  remove() {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  },
  exists() {
    return !!this.get();
  },
};