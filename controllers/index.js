const Joi = require("joi");

const { HttpError } = require("../helpers");

const {
  addContact,
  getContactById,
  listContacts,
  removeContactById,
  updateContactById,
} = require("../models/contacts");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const getAll = async (req, res, next) => {
  try {
    const data = await listContacts();
    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await getContactById(id);

    if (!data) {
      throw HttpError(404, "Not found");
    }

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      throw HttpError(400, `missing field ${error.message}`);
    }

    const result = await addContact(req.body);

    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { error } = addSchema.validate(req.body);

    if (error) {
      throw HttpError(400, `missing field ${error.message}`);
    }

    const data = await updateContactById(id, req.body);

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const removeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await removeContactById(id);

    if (!data) {
      throw HttpError(404, "Not found");
    }

    return res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  updateById,
  add,
  removeById,
};
