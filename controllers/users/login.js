const { User } = require("../../models");

const login = async (req, res) => {
  const result = await User.create(req.body);
  return res.status(200).json(result);
};

module.exports = login;
