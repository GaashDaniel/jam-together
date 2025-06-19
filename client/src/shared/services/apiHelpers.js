import { ApiAuth } from "./apiAuth";
class ApiHelpers extends ApiAuth {
  constructor() {
    super();
  }
  async healthCheck() {
    try {
      const response = await this.get("/health", {
        timeout: 5000,
        maxRetries: 1,
      });
      return { healthy: true, ...response };
    } catch (error) {
      return { healthy: false, error: error.message, type: error.type };
    }
  }
  async batchRequest(requests) {
    const results = await Promise.allSettled(
      requests.map(async ({ endpoint, options = {} }) => {
        try {
          const result = await this.authenticatedRequest(endpoint, options);
          return { success: true, data: result };
        } catch (error) {
          return {
            success: false,
            error: {
              message: error.message,
              type: error.type,
              status: error.status,
            },
          };
        }
      })
    );
    return results.map((result, index) => ({
      endpoint: requests[index].endpoint,
      ...result.value,
    }));
  }
  async parallelRequests(requests) {
    const promises = requests.map(({ endpoint, options = {} }) =>
      this.authenticatedRequest(endpoint, options)
    );
    try {
      const results = await Promise.all(promises);
      return results.map((data, index) => ({
        endpoint: requests[index].endpoint,
        success: true,
        data,
      }));
    } catch (error) {
      throw new Error(`Parallel request failed: ${error.message}`);
    }
  }
  async requestWithTimeout(endpoint, options = {}, timeoutMs = 10000) {
    return this.authenticatedRequest(endpoint, {
      ...options,
      timeout: timeoutMs,
    });
  }
  async retryRequest(endpoint, options = {}, maxRetries = 3) {
    return this.authenticatedRequest(endpoint, {
      ...options,
      maxRetries,
    });
  }
}
export { ApiHelpers };