import User from "../models/User.js";
import { generateToken } from "../utils/jwt.js";
import { loginBruteForcePenalty } from "../middleware/security.js";
import { register } from "./registrationController.js";
import { updateProfile } from "./profileController.js";
export { register, updateProfile };
export const login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });
    if (!user) {
      if (req.bruteForceKey) {
        await loginBruteForcePenalty(req, res, () => {});
      }
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      if (req.bruteForceKey) {
        await loginBruteForcePenalty(req, res, () => {});
      }
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = generateToken(user._id);
    const userResponse = user.toJSON();
    res.json({
      message: "Login successful",
      user: userResponse,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Login failed" });
  }
};
export const logout = async (req, res) => {
  res.json({
    message: "Logout successful",
  });
};
export const getMe = async (req, res) => {
  const user = await User.findById(req.user._id).select("-passwordHash");
  res.json({ user });
};