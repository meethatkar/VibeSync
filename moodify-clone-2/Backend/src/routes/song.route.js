const songController = require("../controllers/song.controller");
const { Router } = require("express");
const songMiddleware = require("../middleware/upload.middleware");
const verifyUser = require("../middleware/auth.middleware");

const songRouter = Router();

songRouter.post(
  "/",
  verifyUser,
  songMiddleware.single("song"),
  songController.uploadSong,
);

songRouter.get("/", verifyUser, songController.getSongByMood);

module.exports = songRouter;
