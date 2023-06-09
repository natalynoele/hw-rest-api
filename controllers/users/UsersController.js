const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const { UsersService } = require("../../services");

class UsersController {
  register = asyncHandler(async (req, res, next) => { 
    const newUser = await UsersService.registerNewUser(req, res)

    return res.status(201).json({
      code: 201,
      message: "success",
      data: { email: newUser.email, subscription: newUser.subscription },
    });

  });

  login = asyncHandler(async (req, res, next) => {

    const user = UsersService.loginUser(req, res);

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    res.json({
      data: {
        email: user.email,
        subscription: user.subscription,
      },
      token,
    });
  });
}

module.exports = new UsersController();
