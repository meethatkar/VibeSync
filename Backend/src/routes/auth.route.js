const { Router } = require("express");
const authController = require("../controllers/auth.controller");

const authRouter = Router();

authRouter.post("/register", authController.Register);
authRouter.post("/login", authController.Login);

module.exports = authRouter;
