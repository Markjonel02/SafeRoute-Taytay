const express = require("express");
const { Register_user } = require("./RegisterUserRoutes"); // make sure you export correctly
const router = express.Router();

/* Routes */
router.post("/register", Register_user);

module.exports = router;
