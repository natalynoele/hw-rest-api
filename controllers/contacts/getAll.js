const { Contact } = require("../../models")

const getAll = async (req, res) => {
  const data = await Contact.find({}, "-createdAt -updatedAt");
  return res.status(200).json(data);
};

module.exports = getAll