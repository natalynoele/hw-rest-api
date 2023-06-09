const express = require("express")

const { isValidId, validateBody } = require("../../middlewares");

// const { usersCtrl } = require("../../controllers")
const { UsersController} = require("../../controllers");

const {userJoiSchemas} = require("../../schemas")


const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userJoiSchemas.userRegisterSchema),
  UsersController.register
);

authRouter.post(
  "/login",
  validateBody(userJoiSchemas.userLoginSchema),
  UsersController.login
);
module.exports = authRouter