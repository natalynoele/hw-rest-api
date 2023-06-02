const { Contact } = require("../../models")
const {HttpError} = require("../../helpers")

const getById = async (req, res) => {
  const { id } = req.params;

  const data = await Contact.findById(id);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).json(data);
};

module.exports = getById