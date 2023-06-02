const { Contact } = require("../../models");

const add = async (req, res) => {
  const result = await Contact.create(req.body);

  return res.status(201).json(result);
};

module.exports = add