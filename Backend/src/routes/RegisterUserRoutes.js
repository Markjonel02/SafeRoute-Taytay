// routes/RegisterUserRoutes.js
const express = require("express");
const { Register_user } = require("../controllers/AuthController"); // ✅ correct import
const router = express.Router();

/* Routes */
router.post("/register", Register_user);

module.exports = router;
