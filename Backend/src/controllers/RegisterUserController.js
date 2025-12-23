const express = require("express");
const User = require("../models/User");
const Register_user = async (req, res) => {
  try {
    const {} = req.body;
    // Registration logic here
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { Register_user };
