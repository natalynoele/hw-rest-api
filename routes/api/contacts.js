const express = require('express')

const { isValidId, validateBody } = require("../../middlewares");
const { contactsCtrl } = require("../../controllers");
const { contactsSchemas } = require("../../schemas");

const contactsRouter = express.Router()

contactsRouter.get("/", contactsCtrl.getAll);

contactsRouter.get("/:id", isValidId, contactsCtrl.getById);

contactsRouter.post(
  "/",
  validateBody(contactsSchemas.addSchema),
  contactsCtrl.add
);

contactsRouter.delete("/:id", isValidId, contactsCtrl.removeById);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(contactsSchemas.addSchema),
  contactsCtrl.updateById
);

contactsRouter.patch(
  "/:id",
  isValidId,
  validateBody(contactsSchemas.updateFavoriteSchema),
  contactsCtrl.updateStatusContact
);

module.exports = contactsRouter;
