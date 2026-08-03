const express = require("express");
const cookies = require("cookie-parser");

// Routes import
const authRoute = require("./routes/auth.route");

const app = express();

app.use(express.json());
app.use(cookies());

// Routes use
app.use("/api/auth", authRoute);

module.exports = app;
