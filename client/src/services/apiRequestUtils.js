import { API_CONFIG, API_ERROR_TYPES } from "./apiConstants";
import { ApiError } from "./apiErrorUtils";
export const createTimeoutPromise = (timeout) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(
        new ApiError(
          `Request timed out after ${timeout}ms`,
          API_ERROR_TYPES.TIMEOUT_ERROR,
          408,
          null,
          { timeout }
        )
      );
    }, timeout);
  });
};
export const calculateRetryDelay = (retryCount) => {
  const delay = Math.min(
    API_CONFIG.RETRY_BASE_DELAY * Math.pow(2, retryCount),
    API_CONFIG.MAX_RETRY_DELAY
  );
  const jitter = Math.random() * 0.1 * delay;
  return delay + jitter;
};
export const prepareRequestConfig = (options, token) => {
  const isFormData = options.body instanceof FormData;
  return {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    credentials: "include",
  };
};
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));