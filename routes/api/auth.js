const express = require("express")

const { validateBody, authenticate } = require("../../middlewares");

const { AuthController} = require("../../controllers");

const {userRegisterSchema, userLoginSchema} = require("../../schemas/joi")


const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userRegisterSchema),
  AuthController.register
);

authRouter.post(
  "/login",
  validateBody(userLoginSchema),
  AuthController.login
);

authRouter.post("/logout", authenticate, AuthController.logout);
module.exports = authRouter