const { Router } = require("express");
const upload = require("../middleware/upload.middleware");
const songController = require("../controllers/song.controller");



const songRouter = Router();

/**
 * @route "/api/song/"
 */
songRouter.post("/", upload.single("song"), songController.uploadSong);

module.exports = songRouter;