import { API_CONFIG } from "../../services/apiConstants";
import {
  ApiError,
  parseErrorFromResponse,
  createNetworkError,
} from "../../services/apiErrorUtils";
import {
  createTimeoutPromise,
  calculateRetryDelay,
  prepareRequestConfig,
  delay,
} from "../../services/apiRequestUtils";
class ApiClient {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.defaultTimeout = API_CONFIG.DEFAULT_TIMEOUT;
    this.maxRetries = API_CONFIG.MAX_RETRIES;
    this.requestInterceptors = [];
    this.responseInterceptors = [];
  }
  addRequestInterceptor(interceptor) {
    this.requestInterceptors.push(interceptor);
  }
  addResponseInterceptor(interceptor) {
    this.responseInterceptors.push(interceptor);
  }
  async executeRequest(url, config, timeout) {
    const fetchPromise = fetch(url, config);
    const timeoutPromise = createTimeoutPromise(timeout);
    const response = await Promise.race([fetchPromise, timeoutPromise]);
    if (response.ok) {
      let data;
      try {
        data = await response.json();
      } catch {
        data = {};
      }
      for (const interceptor of this.responseInterceptors) {
        data = await interceptor(data, response);
      }
      return data;
    }
    return await parseErrorFromResponse(response);
  }
  async request(endpoint, options = {}, authHandler = null) {
    const url = `${this.baseURL}${endpoint}`;
    const timeout = options.timeout || this.defaultTimeout;
    const maxRetries = options.maxRetries ?? this.maxRetries;
    let config = prepareRequestConfig(options);
    if (authHandler) {
      config = await authHandler(config, endpoint);
    }
    for (const interceptor of this.requestInterceptors) {
      config = await interceptor(config, endpoint);
    }
    let lastError;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const result = await this.executeRequest(url, config, timeout);
        if (result instanceof ApiError) {
          throw result;
        }
        return result;
      } catch (error) {
        lastError =
          error instanceof ApiError
            ? error
            : createNetworkError(error, url, attempt);
        if (!lastError.isRetryable() || attempt >= maxRetries) {
          break;
        }
        const retryDelay = calculateRetryDelay(attempt);
        if (import.meta.env.DEV) {
          console.warn(
            `Retrying request (${attempt + 1}/${
              maxRetries + 1
            }) in ${Math.round(retryDelay)}ms`
          );
        }
        await delay(retryDelay);
      }
    }
    lastError.context.finalRetryCount = maxRetries;
    throw lastError;
  }
}
export { ApiClient };