const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

/**
 * Get the contacts from the file
 * @returns {array}
 */
async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

/**
 * Get contact by ID
 * @param {string} contactId
 * @returns {object || null}
 */
async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
}

/**
 * Add new contact
 * @param {object} data
 * @returns {object} new contact
 */
async function addContact(data) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...data,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

/**
 * Update contact by id
 * @param {string} contactId 
 * @param {object} data 
 * @returns {object}
 */
const updateContactById = async (contactId, data) => { 
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
      return null;
    }
    contacts[index] = { contactId, ...data };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];  
};

/**
 * Delete contact by ID
 * @param {string} contactId
 * @returns {object || null} the removed contact
 */
async function removeContactById(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContactById,
  updateContactById,
};
