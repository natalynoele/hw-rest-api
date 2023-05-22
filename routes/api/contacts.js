const express = require('express')

const router = express.Router()

const contacts = require('../../models/contacts')

router.get("/", contacts.listContacts);

router.get('/:contactId', contacts.getContactById)

router.post('/', contacts.addContact)

router.delete('/:contactId', contacts.removeContact)

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
