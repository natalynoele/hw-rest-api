const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs/promises");
const path = require("path");
const gravatar = require("gravatar");
const Jimp = require("jimp");

const { User } = require("../models");
const { HttpError } = require("../helpers");
const { subscriptionOptions } = require("../constants/users");

const avatarsDir = path.resolve("public", "avatars");

class AuthService {
  async registerNewUser(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, `Email: ${email} is already in use`);
    }

    if (!email || !password) {
      throw HttpError(400, "Please provide all the requested fields");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const avatarUrl = gravatar.url(email);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
      avatarUrl,
    });

    return newUser;
  }

  async updateAvatar(req) {
    const { _id: id } = req.user;

    const { path: tempUpload, mimetype } = req.file;

    const type = mimetype.split("/");

    const fileName = `avatar-thumb-${id}.${type[1]}`;

    const resultUpload = path.join(avatarsDir, fileName);

    Jimp.read(tempUpload)
      .then((avatar) => {
        avatar.resize(250, 250).write(resultUpload);
      })
      .catch((err) => {
        throw err;
      })
      .finally(fs.unlink(tempUpload));

    const avatarUrl = path.join("avatars", fileName);

    const user = await User.findByIdAndUpdate(id, { avatarUrl }, { new: true });

    return user;
  }

  async login(req) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw HttpError(400, "Please provide all the requested fields");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401);
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401);
    }
    const { _id: id } = user;

    const payload = {
      id,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "2h",
    });

    const theUser = await User.findByIdAndUpdate(id, { token }, { next: true });

    return theUser;
  }

  async logout(req) {
    const { _id } = req.user;

    const user = await User.findByIdAndUpdate(
      _id,
      { token: "" },
      { next: true }
    );

    if (!user) {
      throw HttpError(401, "Not authorized");
    }

    return {
      code: 200,
      message: "Logout success",
    };
  }

  async updateSubscription(req) {
    const { _id } = req.user;
    const { subscription } = req.body;

    const id = _id;

    if (!subscription) {
      throw HttpError(400, "Please provide the subscription field");
    }

    if (!subscriptionOptions.includes(subscription)) {
      throw HttpError(
        400,
        "Please choose the subscription from the offered options"
      );
    }

    const user = await User.findByIdAndUpdate(id, req.body, { new: true });

    if (!user) {
      throw HttpError(404, `The user with id: ${id} is not found`);
    }

    return user;
  }

  async getCurrent(req) {
    if (!req.user) {
      throw HttpError(401);
    }
    const { email, subscription } = req.user;
    return {
      email,
      subscription,
    };
  }
}

module.exports = new AuthService();
