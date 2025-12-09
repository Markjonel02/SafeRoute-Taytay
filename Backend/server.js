const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const ConnectionDB = require("./config/Connection");
/* middlewares */
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

ConnectionDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
      console.log(`✅ Database connected successfully.`);
      console.log(`✅ Uploads directory: ${global.uploadsDir}`);
    });
  })
  .catch(
    (err) => console.error("❌ Database connection failed:", err),
    process.exit(1)
  );
