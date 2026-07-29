const mongoose = require("mongoose");

async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected");
  } catch (error) {
    console.log("Error in DB Connection: ", error);
  }
}

module.exports = connectToDB;
