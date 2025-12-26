const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // hash before save
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    birthdate: { type: Date, required: true },
    age: { type: Number, required: true },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other", "prefer-not-to-say"],
    },
    phonenumber: {
      type: String,
      required: true,
      unique: true,
      match: [/^\d{10,15}$/, "Please enter a valid phone number"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    address: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    barangay: { type: String, required: true },
    zip: { type: String, required: true },
    telephone: { type: String, default: null },
    role: { type: String, required: true, enum: ["admin", "user", "rescuers"] },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
  },
  { timestamps: true } // auto-manages createdAt & updatedAt
);

// presave the password hashing can be added here
// 🔑 Pre-save hook for password hashing
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // only hash if changed
  try {
    const salt = await bcrypt.genSalt(10); // generate salt
    this.password = await bcrypt.hash(this.password, salt); // hash password
    next();
  } catch (err) {
    next(err);
  }
});
// Add geospatial index
UserSchema.index({ location: "2dsphere" });
module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
