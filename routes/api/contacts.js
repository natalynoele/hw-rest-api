const express = require('express')

const { isValidId, validateBody } = require("../../middlewares");
const { contactsCtrl } = require("../../controllers");
const { addSchema, updateFavoriteSchema } = require("../../schemas/joi");

const contactsRouter = express.Router()

contactsRouter.get("/", contactsCtrl.getAll);

contactsRouter.get("/:id", isValidId, contactsCtrl.getById);

contactsRouter.post(
  "/",
  validateBody(addSchema),
  contactsCtrl.add
);

contactsRouter.delete("/:id", isValidId, contactsCtrl.removeById);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(addSchema),
  contactsCtrl.updateById
);

contactsRouter.patch(
  "/:id",
  isValidId,
  validateBody(updateFavoriteSchema),
  contactsCtrl.updateStatusContact
);

module.exports = contactsRouter;
