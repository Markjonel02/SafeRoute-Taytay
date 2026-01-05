const jwt = require("jsonwebtoken");

/**
 * Generate access and refresh tokens for a user.
 */
function generateTokens(user) {
  const payload = {
    UserInfo: {
      id: user._id,
      username: user.username,
      role: user.role,
      userstatus: user.userstatus,
    },
  };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  console.log("REFRESH_TOKEN_SECRET:", process.env.REFRESH_TOKEN_SECRET);

  return { accessToken, refreshToken };
}

/**
 * Attach refresh token to secure HTTP-only cookie.
 */
function setRefreshTokenCookie(res, token) {
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

module.exports = { generateTokens, setRefreshTokenCookie };
