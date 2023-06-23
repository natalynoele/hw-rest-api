const express = require("express");

const { validateBody, authenticate, upload } = require("../../middlewares");

const { AuthController } = require("../../controllers");

const { userSchemas } = require("../../schemas/joi");

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSchemas.registerSchema),
  AuthController.register
);

authRouter.get("/verify/:verificationToken", AuthController.verify);

authRouter.post(
  "/verify",
  validateBody(userSchemas.emailSchema),
  AuthController.resendVerify
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

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  AuthController.updateAvatar
);

authRouter.get("/current", authenticate, AuthController.getCurrent);

module.exports = authRouter;
