const express = require("express");
const cors = require("cors");
const ConnectionDB = require("../config/Connection");

const app = express();
const port = process.env.PORT || 5000;

/* middlewares */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

ConnectionDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
      console.log(`✅ Database connected successfully.`);
      console.log(`✅ Uploads directory: ${global.uploadsDir}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });
