class ContactsClass {
  constructor(req, res) {
    this.req = req;
    this.res = res;
  }

  async add() {
    const result = await Contact.create(req.body);

    return this.res.status(201).json(result);
  }
}

module.exports = new ContactsClass();
