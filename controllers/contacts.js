const { HttpError, ctrlWrapper } = require("../helpers");

const { Contact } = require("../models")

const getAll = async (req, res) => {
  const data = await Contact.find({}, "-createdAt -updatedAt");
  return res.status(200).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const data = await Contact.findById(id);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).json(data);
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);

  return res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;

  const data = await Contact.findByIdAndUpdate(id, req.body, {new: true});
  if (!data) {
    throw HttpError(404, "Not Found");
  }
  return res.status(200).json(data);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const data = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!data) {
    throw HttpError(404, "Not Found");
  }
  return res.status(200).json(data);
};


const removeById = async (req, res) => {
  const { id } = req.params;

  const data = await Contact.findByIdAndRemove(id);
  if (!data) {
    throw HttpError(404, "Not Found");
  }
  return res.status(200).json({message: "contact was deleted"});
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
};
