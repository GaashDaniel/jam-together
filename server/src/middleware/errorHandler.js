const errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      error: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
    });
  }
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      error: errors.length > 1 ? errors : errors[0],
    });
  }
  if (err.name === "CastError") {
    return res.status(400).json({
      error: "Invalid ID format",
    });
  }
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "Invalid token",
    });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "Token expired",
    });
  }
  if (err.status) {
    return res.status(err.status).json({
      error: err.message,
    });
  }
  res.status(500).json({
    error:
      process.env.NODE_ENV === "production"
        ? "Something went wrong"
        : err.message,
  });
};
export default errorHandler;