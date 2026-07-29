const express = require("express");

// Routes import
const authRoute = require("./routes/auth.route");

const app = express();

app.use(express.json());

// Routes use
app.use("/api/auth", authRoute);

module.exports = app;
