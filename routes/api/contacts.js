const express = require('express')

const router = express.Router()

const { contactsCtrl } = require("../../controllers")

const { validateBody } = require("../../middlewares")

const {contacts} = require("../../schemas")

router.get("/", contactsCtrl.getAll);

router.get("/:id", contactsCtrl.getById);

router.post("/", validateBody(contacts.addSchema),contactsCtrl.add);

router.delete("/:id", contactsCtrl.removeById);

router.put("/:id", validateBody(contacts.addSchema),contactsCtrl.updateById);

module.exports = router
