const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "song name is required"],
  },
  singer: {
    type: String,
    required: [true, "singer is required"],
  },
  releasedOn: {
    type: String,
    required: [true, "song release date is required"],
  },
  plays: {
    type: String,
    required: [true, "song played count is required"],
  },
  posterUrl: {
    type: String,
    required: [true, "song poster url is required"],
  },
})

const songModel = mongoose.model("songs", songSchema);

module.exports = songModel;