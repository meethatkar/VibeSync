const { Router } = require("express");
const verifyUser = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const songController = require("../controllers/song.controller");

const songRouter = Router();

/**
 * @route "/api/song/"
 */
songRouter.post(
  "/",
  verifyUser,
  upload.single("song"),
  songController.uploadSong,
);
songRouter.get("/", verifyUser, songController.getSong);

module.exports = songRouter;
