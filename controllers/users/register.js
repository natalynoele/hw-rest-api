const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { User } = require("../../models");
const {HttpError}= require("../../helpers")

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({ email });
  if (user) {
    HttpError(409, `Email: ${email} is already in use`);
  }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = User.create({ ...req.body, password: hashPassword })
  return res.status(201).json( newUser );

};

module.exports = register;
