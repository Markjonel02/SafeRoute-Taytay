// routes/RegisterUserRoutes.js
const express = require("express");
const { Register_user, Login_user } = require("../controllers/AuthController"); // ✅ correct import

const authorizeRoles = require("../middlewares/authorizeRoles");
const verifyJWT = require("../middlewares/JwtToken");
const router = express.Router();

/* Routes */
router.post("/register", Register_user);
router.post("/login", Login_user);

module.exports = router;
