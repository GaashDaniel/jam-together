export const customSecurityHeaders = (req, res, next) => {
  res.set({
    "Cache-Control": "no-cache, no-store, must-revalidate, private",
    Pragma: "no-cache",
    Expires: "0",
    "X-API-Version": process.env.API_VERSION || "1.0",
    "X-Request-ID": Math.random().toString(36).substr(2, 9),
    "X-Content-Type-Options": "nosniff",
    "X-XSS-Protection": "1; mode=block",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy":
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), bluetooth=()",
    "Cross-Origin-Embedder-Policy": "credentialless",
    "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    "Cross-Origin-Resource-Policy": "cross-origin",
    Server: "JamTogether-API",
  });
  res.removeHeader("X-Powered-By");
  res.removeHeader("Server");
  res.removeHeader("ETag");
  next();
};
export const getSecurityConfig = () => {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    strictMode: isProduction,
    forceHttps: isProduction,
    cspReporting: !isProduction,
    allowUnsafeEval: !isProduction,
    allowInlineStyles: true,
    logLevel: isProduction ? "warn" : "info",
    strictRateLimiting: isProduction,
    secureCookies: isProduction,
    strictCors: isProduction,
  };
};
export default customSecurityHeaders;