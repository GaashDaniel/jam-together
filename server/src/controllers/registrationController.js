import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
export const register = async (req, res) => {
  const {
    username,
    email,
    password,
    fullName,
    instruments,
    birthDate,
    country,
    city,
    profilePicture,
    bio,
  } = req.body;
  try {
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ error: "Username already exists" });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ error: "Email already exists" });
      }
    }
    if (
      !instruments ||
      !Array.isArray(instruments) ||
      instruments.length === 0
    ) {
      return res
        .status(400)
        .json({ error: "At least one instrument is required" });
    }
    for (const instrument of instruments) {
      if (!instrument.instrument || typeof instrument.instrument !== "string") {
        return res.status(400).json({ error: "Invalid instrument name" });
      }
      if (
        !instrument.experienceInYears ||
        instrument.experienceInYears < 1 ||
        instrument.experienceInYears > 99
      ) {
        return res
          .status(400)
          .json({ error: "Experience years must be between 1 and 99" });
      }
    }
    if (birthDate) {
      const parsedDate = new Date(birthDate);
      if (isNaN(parsedDate.getTime()) || parsedDate > new Date()) {
        return res.status(400).json({
          error: "Invalid birth date or birth date cannot be in the future",
        });
      }
    }
    if (profilePicture) {
      const isValidUrl = /^https?:\/\/.+/.test(profilePicture);
      const isValidUploadPath = /^\/uploads\/profile-pictures\/.+/.test(
        profilePicture
      );
      if (!isValidUrl && !isValidUploadPath) {
        return res.status(400).json({
          error: "Profile picture must be a valid URL or uploaded file path",
        });
      }
    }
    if (fullName && fullName.length > 100) {
      return res
        .status(400)
        .json({ error: "Full name cannot exceed 100 characters" });
    }
    if (bio && bio.length > 500) {
      return res
        .status(400)
        .json({ error: "Bio cannot exceed 500 characters" });
    }
    if (country && country.length > 100) {
      return res
        .status(400)
        .json({ error: "Country name cannot exceed 100 characters" });
    }
    if (city && city.length > 100) {
      return res
        .status(400)
        .json({ error: "City name cannot exceed 100 characters" });
    }
    const passwordHash = await User.hashPassword(password);
    const newUserFields = {
      username,
      email,
      passwordHash,
      instruments,
    };
    if (fullName !== undefined) newUserFields.fullName = fullName;
    if (birthDate !== undefined) newUserFields.birthDate = birthDate;
    if (country !== undefined) newUserFields.country = country;
    if (city !== undefined) newUserFields.city = city;
    if (profilePicture !== undefined)
      newUserFields.profilePicture = profilePicture;
    if (bio !== undefined) newUserFields.bio = bio;
    const user = new User(newUserFields);
    const validationError = user.validateSync();
    if (validationError) {
      const firstError = Object.values(validationError.errors)[0];
      return res.status(400).json({ error: firstError.message });
    }
    await user.save();
    const token = generateToken(user._id);
    const userResponse = user.toJSON();
    res.status(201).json({
      message: "Registration successful",
      user: userResponse,
      token,
    });
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        error: `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
      });
    }
    if (error.name === "ValidationError") {
      const firstError = Object.values(error.errors)[0];
      return res.status(400).json({ error: firstError.message });
    }
    res.status(500).json({ error: "Registration failed" });
  }
};