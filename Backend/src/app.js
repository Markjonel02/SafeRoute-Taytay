const express = require("express");
const userRoutes = require("./routes/RegisterUserRoutes");

const router = express.Router();

// Group all feature routes here
router.use("/users", userRoutes);

module.exports = router;
