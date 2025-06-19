export const isDevelopment = false;
export const disableRateLimits = false;
export const RATE_LIMIT_CONFIG = {
  general: {
    points: 1000,
    duration: 900,
    blockDuration: 60,
  },
  auth: {
    points: 50,
    duration: 900,
    blockDuration: 300,
  },
  upload: {
    points: 100,
    duration: 3600,
    blockDuration: 300,
  },
  admin: {
    points: 200,
    duration: 300,
    blockDuration: 300,
  },
  passwordReset: {
    points: 20,
    duration: 3600,
    blockDuration: 600,
  },
};
export const BRUTE_FORCE_CONFIG = {
  failedLogins: {
    points: 30,
    duration: 3600,
    blockDuration: 600,
  },
  failedPasswordResets: {
    points: 15,
    duration: 3600,
    blockDuration: 600,
  },
};
export const SECURITY_CONFIG = {
  requestTimeout: 60000,
  maxRequestSize: 52428800,
  slowRequestThreshold: 10000,
  blockedIPs: [],
  apiVersion: "1.0.0",
};