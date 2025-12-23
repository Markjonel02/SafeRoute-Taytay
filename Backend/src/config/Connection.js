const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const ConnectionDB = async () => {
  const URI = process.env.MONGO_URI;
  if (!URI) {
    console.log("connection database error!");
    process.exit(1);
  }

  try {
    await mongoose.connect(URI);
    console.log("Database Successfully connected");
  } catch (error) {
    console.log("theres an error while connecting:", error.message);
  }
};

module.exports = ConnectionDB;
