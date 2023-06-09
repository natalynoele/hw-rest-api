const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");
const { HttpError } = require("../../helpers");

class UsersController {
  register = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      HttpError(409);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ ...req.body, password: hashPassword });
    return res
      .status(201)
      .json({
        code: 201,
        message: "success",
        data: { email: newUser.email, subscription: newUser.subscription },
      });
  });

  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401);
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401);
    }

    const payload = {
      id: user._id,
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    res.json({
      token,
    });
  });
}

module.exports = new UsersController()