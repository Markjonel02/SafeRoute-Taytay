const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");

const Register_user = async (req, res) => {
  try {
    const {
      username,
      password,
      firstname,
      lastname,
      birthdate,
      age,
      gender,
      phonenumber,
      email,
      address,
      city,
      state, // must match request body
      barangay, // must match request body
      province,
      zip,
      telephone,
      role,
      location,
    } = req.body;

    if (
      !username ||
      !password ||
      !firstname ||
      !lastname ||
      !birthdate ||
      !age ||
      !gender ||
      !phonenumber ||
      !email ||
      !address ||
      !city ||
      !state ||
      !barangay ||
      !province ||
      !zip ||
      !role ||
      !location
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const existingUser = await User.findOne({
      $or: [{ username }, { email }, { phonenumber }],
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Username, email, or phone number already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      firstname,
      lastname,
      birthdate,
      age,
      gender,
      phonenumber,
      email,
      address,
      city,
      state,
      barangay,
      province,
      zip,
      telephone,
      role,
      location,
    });
    await newUser.save();

    console.log(`New user registered: ${username}`);
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { Register_user };
