const register = require("./register");

const UsersController = require("./UsersController")

const { ctrlWrapper } = require("../../helpers")

module.exports = {
  // register: ctrlWrapper(register),
  UsersController
};
