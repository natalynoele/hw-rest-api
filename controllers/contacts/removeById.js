const { Contact } = require("../../models");
const { HttpError } = require("../../helpers");


const removeById = async (req, res) => {
  const { id } = req.params;

  const data = await Contact.findByIdAndRemove(id);
  if (!data) {
    throw HttpError(404, "Not Found");
  }
  return res.status(200).json({ message: "contact was deleted" });
};


module.exports = removeById