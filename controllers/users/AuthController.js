const asyncHandler = require("express-async-handler");

const { AuthService, EmailService } = require("../../services");

class AuthController {
  register = asyncHandler(async (req, res, next) => {
    const newUser = await AuthService.registerNewUser(req);

    return res.status(201).json({
      code: 201,
      message: "success",
      data: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarUrl: newUser.avatarUrl,
        verify: newUser.verify,
        verificationToken: newUser.verificationToken,
      },
    });
  });

  verify = asyncHandler(async (req, res, next) => {
    const message = await EmailService.verify(req);

    res.status(200).json(message);
  });

  resendVerify = asyncHandler(async (req, res, next) => {
    const message = await EmailService.resendVerify(req);

    res.status(200).json(message);
  });

  login = asyncHandler(async (req, res, next) => {
    const user = await AuthService.login(req);

    res.status(200).json(user.token);
  });

  logout = asyncHandler(async (req, res) => {
    const data = await AuthService.logout(req);

    res.status(200).json(data);
  });

  update = asyncHandler(async (req, res, next) => {
    const data = await AuthService.updateSubscription(req);

    res.status(200).json(data);
  });

  updateAvatar = asyncHandler(async (req, res, next) => {
    const user = await AuthService.updateAvatar(req);

    res.status(200).json({
      status: "success",
      message: "The avatar was successfuly changed",
      data: user.avatarUrl,
    });
  });

  getCurrent = asyncHandler(async (req, res, next) => {
    const data = await AuthService.getCurrent(req);

    res.status(200).json(data);
  });
}

module.exports = new AuthController();
