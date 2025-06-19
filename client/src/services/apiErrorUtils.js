import { API_ERROR_TYPES, HTTP_STATUS_CODES } from "./apiConstants";
export class ApiError extends Error {
  constructor(message, type, status, originalError = null, context = {}) {
    super(message);
    this.name = "ApiError";
    this.type = type;
    this.status = status;
    this.originalError = originalError;
    this.context = context;
    this.timestamp = new Date().toISOString();
  }
  isRetryable() {
    return [
      API_ERROR_TYPES.NETWORK_ERROR,
      API_ERROR_TYPES.TIMEOUT_ERROR,
      API_ERROR_TYPES.SERVER_ERROR,
    ].includes(this.type);
  }
  isAuthError() {
    return [
      API_ERROR_TYPES.AUTHENTICATION_ERROR,
      API_ERROR_TYPES.AUTHORIZATION_ERROR,
    ].includes(this.type);
  }
  getUserMessage() {
    switch (this.type) {
      case API_ERROR_TYPES.NETWORK_ERROR:
        return "Network connection failed. Please check your internet connection and try again.";
      case API_ERROR_TYPES.TIMEOUT_ERROR:
        return "Request timed out. Please try again.";
      case API_ERROR_TYPES.AUTHENTICATION_ERROR:
        return "Your session has expired. Please log in again.";
      case API_ERROR_TYPES.AUTHORIZATION_ERROR:
        return "You don't have permission to perform this action.";
      case API_ERROR_TYPES.VALIDATION_ERROR:
        return this.message || "Please check your input and try again.";
      case API_ERROR_TYPES.NOT_FOUND_ERROR:
        return "The requested resource was not found.";
      case API_ERROR_TYPES.RATE_LIMIT_ERROR:
        return "Too many requests. Please wait a moment before trying again.";
      case API_ERROR_TYPES.SERVER_ERROR:
        return "Server error occurred. Please try again later.";
      case API_ERROR_TYPES.CLIENT_ERROR:
        return this.message || "Request failed. Please check your input.";
      default:
        return (
          this.message || "An unexpected error occurred. Please try again."
        );
    }
  }
}
export const classifyErrorByStatus = (status) => {
  switch (status) {
    case HTTP_STATUS_CODES.BAD_REQUEST:
      return API_ERROR_TYPES.VALIDATION_ERROR;
    case HTTP_STATUS_CODES.UNAUTHORIZED:
      return API_ERROR_TYPES.AUTHENTICATION_ERROR;
    case HTTP_STATUS_CODES.FORBIDDEN:
      return API_ERROR_TYPES.AUTHORIZATION_ERROR;
    case HTTP_STATUS_CODES.NOT_FOUND:
      return API_ERROR_TYPES.NOT_FOUND_ERROR;
    case HTTP_STATUS_CODES.TOO_MANY_REQUESTS:
      return API_ERROR_TYPES.RATE_LIMIT_ERROR;
    case HTTP_STATUS_CODES.TIMEOUT:
      return API_ERROR_TYPES.TIMEOUT_ERROR;
    default:
      if (status >= 500) {
        return API_ERROR_TYPES.SERVER_ERROR;
      } else if (status >= 400) {
        return API_ERROR_TYPES.CLIENT_ERROR;
      } else {
        return API_ERROR_TYPES.UNKNOWN_ERROR;
      }
  }
};
export const parseErrorFromResponse = async (response) => {
  let errorData;
  try {
    errorData = await response.json();
  } catch {
    errorData = { error: `HTTP ${response.status} - ${response.statusText}` };
  }
  const message =
    errorData.error ||
    errorData.message ||
    `HTTP error! status: ${response.status}`;
  const errorType = classifyErrorByStatus(response.status);
  return new ApiError(message, errorType, response.status, null, {
    url: response.url,
    status: response.status,
    statusText: response.statusText,
    errorData,
  });
};
export const createNetworkError = (error, url, retryCount = 0) => {
  if (error.name === "TypeError" && error.message.includes("fetch")) {
    return new ApiError(
      "Network connection failed",
      API_ERROR_TYPES.NETWORK_ERROR,
      0,
      error,
      { url, retryCount }
    );
  } else if (error.name === "AbortError") {
    return new ApiError(
      "Request was aborted",
      API_ERROR_TYPES.TIMEOUT_ERROR,
      0,
      error,
      { url, retryCount }
    );
  } else {
    return new ApiError(
      error.message || "Unknown error occurred",
      API_ERROR_TYPES.UNKNOWN_ERROR,
      0,
      error,
      { url, retryCount }
    );
  }
};