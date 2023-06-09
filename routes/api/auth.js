const express = require("express")

const { validateBody } = require("../../middlewares");

const { UsersController} = require("../../controllers");

const {userRegisterSchema, userLoginSchema} = require("../../schemas/joi")


const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userRegisterSchema),
  UsersController.register
);

authRouter.post(
  "/login",
  validateBody(userLoginSchema),
  UsersController.login
);
module.exports = authRouter