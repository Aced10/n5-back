const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const db = require(path.resolve("src/data-access/sequelize", "models"));

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is ready on port ${process.env.PORT ?? 4200}`);
});

app.use(bodyParser.json({ limit: "50mb", extended: true }));

//Routes
app.use("/api/permissions", require("./routes/permissionsRoutes"));
app.use("/api/permission-types", require("./routes/permissionsTypeRoutes"));

module.exports = { app, server };
