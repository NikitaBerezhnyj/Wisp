require("dotenv").config();
const express = require("express");
const cors = require("cors");

const connection = require("./config/dbConfig");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

const requiredEnvVars = [
  "PORT",
  "HOSTNAME",
  "ORIGIN_WEBSITE",
  "DB",
  "SALT",
  "JWT_PRIVATE_TOKEN",
  "EMAIL",
  "PASSWORD"
];

const missingVars = requiredEnvVars.filter(key => !process.env[key]);

if (missingVars.length > 0) {
  console.error(
    `Missing necessary environment variables: ${missingVars.join(", ")}`
  );
  process.exit(1);
}

app.use(
  cors({ origin: process.env.ORIGIN_WEBSITE || "http://localhost:5173" })
);
app.use(express.json());

connection();

app.use("/api", userRoutes);
app.use("/api", postRoutes);

app.use("/uploads", express.static("uploads"));

module.exports = app;
