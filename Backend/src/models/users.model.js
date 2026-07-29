const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username is already taken, try different username"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email already exists, try to login"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
