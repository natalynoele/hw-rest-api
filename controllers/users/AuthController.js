const asyncHandler = require("express-async-handler");
// const jwt = require("jsonwebtoken");

// const { User } = require("../../models");

const { AuthService } = require("../../services");

class AuthController {
  register = asyncHandler(async (req, res, next) => {
    const newUser = await AuthService.registerNewUser(req, res);

    return res.status(201).json({
      code: 201,
      message: "success",
      data: { email: newUser.email, subscription: newUser.subscription },
    });
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

  getCurrent = asyncHandler(async (req, res, next) => {
    const data = await AuthService.getCurrent(req);

    res.status(200).json(data);
  });
}

module.exports = new AuthController();
