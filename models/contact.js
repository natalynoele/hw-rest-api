const { model } = require("mongoose");

const { contactSchema} = require("../schemas/mongoose");

const Contact = model("contact", contactSchema);

module.exports = Contact;
