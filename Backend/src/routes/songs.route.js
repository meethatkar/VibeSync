const { Router } = require("express");
const upload = require("../middleware/upload.middleware");
const songController = require("../controllers/song.controller");



const songRouter = Router();

/**
 * @route POST "/api/song/"
 */
songRouter.post("/", upload.single("song"), songController.uploadSong);

/**
 * @route GET "/api/song/"
 */
songRouter.get("/", songController.getSong);

module.exports = songRouter;