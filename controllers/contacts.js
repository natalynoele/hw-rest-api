const { HttpError, ctrlWrapper } = require("../helpers");

const {
  addContact,
  getContactById,
  listContacts,
  removeContactById,
  updateContactById,
} = require("../models/contacts");

const getAll = async (req, res) => {
  const data = await listContacts();
  return res.status(200).json(data);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const data = await getContactById(id);
  if (!data) {
    throw HttpError(404, "Not found");
  }
  return res.status(200).json(data);
};

const add = async (req, res) => {
  const result = await addContact(req.body);

  return res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;

  const data = await updateContactById(id, req.body);
  if (!data) {
    throw HttpError(404, "Not Found");
  }
  return res.status(200).json(data);
};

const removeById = async (req, res) => {
  const { id } = req.params;

  const data = await removeContactById(id);
  if (!data) {
    throw HttpError(404, "Not Found");
  }
  return res.status(200).json({message: "contact was deleted"});
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  updateById: ctrlWrapper(updateById),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
};
