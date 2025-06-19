import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import upload from "../middleware/upload.js";
import { authenticate } from "../middleware/auth.js";
import User from "../models/User.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();
router.post(
  "/profile-picture",
  authenticate,
  upload.single("profilePicture"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }
      const relativePath = `/uploads/profile-pictures/${req.file.filename}`;
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { profilePicture: relativePath },
        { new: true, runValidators: true }
      ).select("-passwordHash");
      if (!user) {
        fs.unlinkSync(req.file.path);
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      if (
        user.profilePicture &&
        user.profilePicture !== relativePath &&
        user.profilePicture.startsWith("/uploads/profile-pictures/")
      ) {
        const oldFilePath = path.join(__dirname, "../../", user.profilePicture);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      res.json({
        success: true,
        message: "Profile picture uploaded successfully",
        profilePicture: relativePath,
        user: user,
      });
    } catch (error) {
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      console.error("Profile picture upload error:", error);
      res.status(500).json({
        success: false,
        message: error.message || "Failed to upload profile picture",
      });
    }
  }
);
router.delete("/profile-picture", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (
      user.profilePicture &&
      user.profilePicture.startsWith("/uploads/profile-pictures/")
    ) {
      const filePath = path.join(__dirname, "../../", user.profilePicture);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }
    user.profilePicture = null;
    await user.save();
    res.json({
      success: true,
      message: "Profile picture deleted successfully",
      user: user.toJSON(),
    });
  } catch (error) {
    console.error("Profile picture deletion error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Failed to delete profile picture",
    });
  }
});
export default router;