const express = require("express")

const { isValidId, validateBody } = require("../../middlewares");

// const { usersCtrl } = require("../../controllers")
const { UsersController} = require("../../controllers");

const {userJoiSchemas} = require("../../schemas")


const authRouter = express.Router();

authRouter.post(
  "/registration",
  validateBody(userJoiSchemas.userRegisterSchema),
  UsersController.register
);

// authRouter.post(
//   "/login",
//   validateBody(userJoiSchemas.userLoginSchema),
//   usersCtrl.register
// );
module.exports = authRouter