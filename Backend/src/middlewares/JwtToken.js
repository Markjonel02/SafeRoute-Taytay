// middleware/verifyJWT.js
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User"); // Import User model

dotenv.config();

/**
 * Middleware to verify JWT access tokens
 * and enforce user activity status.
 */
const verifyJWT = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Validate Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Unauthorized: Missing or invalid Authorization header.",
        logout: true,
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token || token === "null" || token === "undefined") {
      return res.status(401).json({
        message: "Unauthorized: Malformed token.",
        logout: true,
      });
    }

    // Verify JWT using async/await
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          message: "Token expired. Please log in again.",
          logout: true,
        });
      }
      return res.status(403).json({
        message: "Invalid token. Access denied.",
        logout: true,
      });
    }

    // 🧩 Ensure token contains required payload
    if (!decoded?.UserInfo?.id) {
      return res.status(400).json({
        message: "Invalid token payload: missing user info.",
        logout: true,
      });
    }

    // 🗂️ Fetch user from DB
    const user = await User.findById(decoded.UserInfo.id).lean();

    if (!user) {
      return res.status(401).json({
        message: "User not found. Please log in again.",
        logout: true,
      });
    }

    if (user.userStatus !== 1) {
      return res.status(403).json({
        message: "Your account has been disabled. Contact administration.",
        logout: true,
      });
    }

    //  Attach sanitized user info to request
    req.user = {
      id: user._id.toString(),
      username: user.username,
      role: user.role,
    };

    return next();
  } catch (error) {
    console.error("verifyJWT middleware error:", error);
    return res.status(500).json({
      message: "Internal server error during token verification.",
      logout: true,
    });
  }
};

module.exports = verifyJWT;
