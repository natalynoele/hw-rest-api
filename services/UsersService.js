const bcrypt = require("bcrypt");

const { User } = require("../models");
const { HttpError } = require("../helpers");

class UsersService {
  async registerNewUser (req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409);
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
    });

    return newUser;

  }

  async loginUser(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401);
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401);
    }

    return user
  }
}

module.exports = new UsersService();
