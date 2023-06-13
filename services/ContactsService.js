const { Contact } = require("../models");

const { HttpError } = require("../helpers");

class ContactsService {
  async addContact(req) {
    const { name, email, phone } = req.body;
    const { _id: owner } = req.user;

    const person = Contact.findOne({ name });

    if (person) {
      throw HttpError(
        409,
        `The contact with the name: ${name} is already in the collection`
      );
    }

    if (!name || !email || !phone) {
       throw HttpError(
         400,
         "Please provide all the required fields!"
       );
    }

    const newContact = await Contact.create({ ...req.body, owner });
    return newContact;
  }

  async getAllContacts(req) {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, ...query } = req.query;
    const skip = (page - 1) * limit;

    const contacts = await Contact.find(
      { owner, ...query },
      "-createdAt -updatedAt",
      { skip, limit }
    );

    if (!contacts) {
      return null;
    }

    const total = await Contact.where({ owner, ...query }).countDocuments();

    return {
      contacts,
      total,
    };
  }

  async getById(req) {
    const { id } = req.params;

    const data = await Contact.findById(id);
    if (!data) {
      throw HttpError(404, `The contact with id: ${id} is not found`);
    }
    return data;
  }

  async removeById(req) {
    const { id } = req.params;

    const data = await Contact.findByIdAndRemove(id);

    if (!data) {
      throw HttpError(404, `The contact with id: ${id} is not found`);
    }

    return {
      status: "success",
      message: "The contact was successfully deleted",
    };
  }

  async updateById(req) {
    const { id } = req.params;

    const data = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) {
      throw HttpError(404, `The contact with id: ${id} is not found`);
    }

    return data;
  }

  async updateStatus(req) {
    const { id } = req.params;
    const data = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!data) {
      throw HttpError(404, `The contact with id: ${id} is not found`);
    }

    return data;
  }
}

module.exports = new ContactsService();
