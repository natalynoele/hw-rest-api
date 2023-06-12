const asyncHandler = require("express-async-handler");

const { ContactsService } = require("../../services");

class ContactsController {
  add = asyncHandler(async (req, res, next) => {
    const result = await ContactsService.addContact(req);

    return res.status(201).json(result);
  });

  getAll = asyncHandler(async (req, res, next) => {
    const result = await ContactsService.getAllContacts(req);

    return res.status(200).json(result);
  });

  getById = asyncHandler(async (req, res, next) => {
    const result = await ContactsService.getAllContacts(req);

    return res.status(200).json(result);
  });

  updateById = asyncHandler(async (req, res, next) => {
    const result = await ContactsService.updateById(req);

    return res.status(200).json(result);
  });

  updateStatus = asyncHandler(async (req, res, next) => {
    const result = await ContactsService.updateStatus(req);

    return res.status(200).json(result);
  });

  removeById = asyncHandler(async (req, res, next) => {
    const result = await ContactsService.removeById(req);

    return res.status(200).json(result);
  });
}

module.exports = new ContactsController();
