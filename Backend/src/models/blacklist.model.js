const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "token is required for blacklisting"],
      unique: [
        true,
        "token already blacklisted, how the hell new request for blackedlisted token created ???!!!",
      ],
    },
  },
  { timestamps: true },
);

const tokenBlacklistModel = mongoose.model("tokenBlacklist", blacklistSchema);

module.exports = tokenBlacklistModel;
