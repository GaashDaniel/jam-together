import User from "../models/User.js";
export const updateProfile = async (req, res) => {
  const allowedUpdates = [
    "fullName",
    "bio",
    "instruments",
    "birthDate",
    "country",
    "city",
    "profilePicture",
  ];
  try {
    const updates = {};
    for (const field of allowedUpdates) {
      if (req.body[field] !== undefined) {
        const value = req.body[field];
        switch (field) {
          case "fullName":
            if (value && (typeof value !== "string" || value.length > 100)) {
              return res
                .status(400)
                .json({ error: "Full name cannot exceed 100 characters" });
            }
            break;
          case "bio":
            if (value && (typeof value !== "string" || value.length > 500)) {
              return res
                .status(400)
                .json({ error: "Bio cannot exceed 500 characters" });
            }
            break;
          case "instruments":
            if (value) {
              if (!Array.isArray(value) || value.length === 0) {
                return res
                  .status(400)
                  .json({ error: "At least one instrument is required" });
              }
              for (const instrument of value) {
                if (
                  !instrument.instrument ||
                  typeof instrument.instrument !== "string"
                ) {
                  return res
                    .status(400)
                    .json({ error: "Invalid instrument name" });
                }
                if (
                  !instrument.experienceInYears ||
                  instrument.experienceInYears < 1 ||
                  instrument.experienceInYears > 99
                ) {
                  return res.status(400).json({
                    error: "Experience years must be between 1 and 99",
                  });
                }
              }
            }
            break;
          case "birthDate":
            if (value) {
              const parsedDate = new Date(value);
              if (isNaN(parsedDate.getTime()) || parsedDate > new Date()) {
                return res.status(400).json({
                  error:
                    "Invalid birth date or birth date cannot be in the future",
                });
              }
            }
            break;
          case "country":
          case "city":
            if (value && (typeof value !== "string" || value.length > 100)) {
              return res.status(400).json({
                error: `${field.charAt(0).toUpperCase() + field.slice(1)} cannot exceed 100 characters`,
              });
            }
            break;
          case "profilePicture":
            if (value) {
              const isValidUrl = /^https?:\/\/.+/.test(value);
              const isValidUploadPath = /^\/uploads\/profile-pictures\/.+/.test(
                value
              );
              if (!isValidUrl && !isValidUploadPath) {
                return res.status(400).json({
                  error:
                    "Profile picture must be a valid URL or uploaded file path",
                });
              }
            }
            break;
        }
        updates[field] = value;
      }
    }
    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({
      message: "Profile updated successfully",
      user,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const firstError = Object.values(error.errors)[0];
      return res.status(400).json({ error: firstError.message });
    }
    if (error.name === "CastError") {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    res.status(500).json({ error: "Profile update failed" });
  }
};