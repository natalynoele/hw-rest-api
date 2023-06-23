const express = require("express");

const { isValidId, validateBody, authenticate } = require("../../middlewares");

const { ContactsController } = require("../../controllers");

const { addSchema, updateFavoriteSchema } = require("../../schemas/joi");

const contactsRouter = express.Router();

contactsRouter.use(authenticate);

// console.log('controllers')

contactsRouter.get("/", ContactsController.getAll);

contactsRouter.get("/:id", isValidId, ContactsController.getById);

contactsRouter.post("/", validateBody(addSchema), ContactsController.add);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(addSchema),
  ContactsController.updateById
);

contactsRouter.patch(
  "/:id",
  isValidId,
  validateBody(updateFavoriteSchema),
  ContactsController.updateStatus
);

contactsRouter.delete("/:id", isValidId, ContactsController.removeById);

module.exports = contactsRouter;
