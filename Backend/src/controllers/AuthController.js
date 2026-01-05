const User = require("../models/User");
const bcrypt = require("bcrypt");
const { generateTokens, setRefreshTokenCookie } = require("../utils/Token");
const {
  validateRequiredFields,
  checkDuplicate,
} = require("../utils/Validations");
const { generateUserId } = require("../utils/UserId");

const Register_user = async (req, res) => {
  try {
    const {
      username,
      password,
      email,
      phonenumber,
      firstname,
      lastname,
      birthdate,
      age,
      gender,
      role,
      address,
      city,
      state,
      barangay,
      province,
      zip,
      location,
    } = req.body;

    // 1. Validate required fields
    const requiredKeys = [
      "username",
      "password",
      "email",
      "phonenumber",
      "firstname",
      "lastname",
      "birthdate",
      "age",
      "gender",
      "role",
      "address",
      "city",
      "state",
      "barangay",
      "province",
      "zip",
      "location",
    ];
    const missingFields = validateRequiredFields(req.body, requiredKeys);
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // 2. Duplicate checks
    await checkDuplicate(User, "username", username, "Username already in use");
    await checkDuplicate(User, "email", email, "Email already in use");
    await checkDuplicate(
      User,
      "phonenumber",
      phonenumber,
      "Phone number already in use"
    );

    // 3. Generate new userId
    const newUserId = await generateUserId();

    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. Create and save user
    const newUser = new User({
      userId: newUserId,
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

      role,
      location,
    });
    await newUser.save();

    // 6. Generate tokens + set cookie
    const { accessToken, refreshToken } = generateTokens(newUser);
    setRefreshTokenCookie(res, refreshToken);

    // 7. Respond success
    return res.status(201).json({
      message: "User registered successfully",
      accessToken,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
        userId: newUser.userId,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message: error.message || "Server error during registration.",
    });
  }
};

module.exports = { Register_user };
