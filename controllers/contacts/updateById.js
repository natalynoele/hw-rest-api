const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");

const updateById = async (req, res) => {
  const { id } = req.params;

  const data = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!data) {
    throw HttpError(404, "Not Found");
  }
  return res.status(200).json(data);
};

module.exports = updateById