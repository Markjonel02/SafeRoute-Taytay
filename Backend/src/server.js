// server.js
const express = require("express");
const cors = require("cors");
const ConnectionDB = require("./config/Connection");
const RegisterUserRoutes = require("./routes/RegisterUserRoutes");

const app = express();
const port = process.env.PORT || 5000;

/* Global middlewares */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */
app.use("/api", RegisterUserRoutes); // ✅ base path

app.get("/api/users", (req, res) => {
  res.send("SafeRoute Navigator Backend is running!");
});
ConnectionDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
      console.log(`✅ Database connected successfully.`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });
