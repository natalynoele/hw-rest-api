const express = require("express")

const { validateBody, authenticate } = require("../../middlewares");

const { AuthController} = require("../../controllers");

const { userSchemas } = require("../../schemas/joi");
const { AuthService } = require("../../services");


const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSchemas.registerSchema),
  AuthController.register
);

authRouter.post(
  "/login",
  validateBody(userSchemas.loginSchema),
  AuthController.login
);

authRouter.post("/logout", authenticate, AuthController.logout);

authRouter.patch(
  "/",
  authenticate,
  validateBody(userSchemas.updateSubSchema),
  AuthController.update
);

authRouter.get("/current", authenticate, AuthController.getCurrent)

module.exports = authRouter