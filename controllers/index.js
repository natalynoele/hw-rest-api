const contactsCtrl = require("./contacts");
const { AuthController } = require("./users");
const { ContactsController } = require("./contacts")

const usersCtrl = require("./users");

module.exports = {
  contactsCtrl,
  usersCtrl,
  AuthController,
  ContactsController
};
