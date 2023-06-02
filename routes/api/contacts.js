const express = require('express')

const { isValidId, validateBody } = require("../../middlewares");
const { contactsCtrl } = require("../../controllers");
const { contactsSchemas } = require("../../schemas");

const router = express.Router()

router.get("/", contactsCtrl.getAll);

router.get("/:id", isValidId, contactsCtrl.getById);

router.post("/", validateBody(contactsSchemas.addSchema), contactsCtrl.add);

router.delete("/:id", isValidId, contactsCtrl.removeById);

router.put(
  "/:id",
  isValidId,
  validateBody(contactsSchemas.addSchema),
  contactsCtrl.updateById
);

router.patch(
  "/:id",
  isValidId,
  validateBody(contactsSchemas.updateFavoriteSchema),
  contactsCtrl.updateStatusContact
);

module.exports = router
