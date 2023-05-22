const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "contacts.json");

const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().alphanum().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .messages({ "string.pattern.base": `Email is required.` })
    .required(),
  phone: Joi.string()
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .regex(/^[0-9]{10}$/)
    .required(),
});

const listContacts = async (req, res, next) => {
  try {
    const data = await fs.readFile(contactsPath);
    return res.json({
      status: "success",
      code: 200,
      data: JSON.parse(data),
    });
  } catch (error) {
    return res.json({
      message: `Something went wrong:  ${error.message}`,
    });
  }
};

const getContactById = async (req, res, next) => {
  const contactId = req.params.contactId;
   try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    const data = contacts.find((contact) => contact.id === contactId);
    return res.json({
      status: "success",
      code: 200,
      data: data,
    });
  } catch (error) {
    return res.json({
      message: `Something went wrong:  ${error.message}`,
    });
  }
};

const removeContact = async (req, res, next) => {
  const contactId = req.params.contactId;
  const contacts = await fs.readFile(contactsPath)
   const index = contacts.findIndex((contact) => contact.id === contactId);
   if (index === -1) {
     return  res.json({
        status: "failed",
        code: 404,
        message: "Not found",
      })
   }
   const [result] = contacts.splice(index, 1);
   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return res.json({
    status: "success",
    code: 200,
    message: "contact deleted"   
  });
};

const addContact = async (req, res, next) => {
  const data = req.body
  const { error, value } = schema.validate(data);
  console.log('value :>> ', value);
  try {
    const contacts = JSON.parse(await fs.readFile(contactsPath));
    const newContact = {
      id: nanoid(),
      ...data,
    };
    console.log('newContact :>> ', newContact);
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
// console.log('res :>> ', res);
    res.json({
      status: "success",
      code: 201,
      data: newContact,
    });    
  } catch (error) {
    console.log(`Something went wrong:  ${error.message}`);
  }
};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
