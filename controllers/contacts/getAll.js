const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, ...query } = req.query;
  const skip = (page - 1) * limit;

  const data = await Contact.find(
    { owner, ...query },
    "-createdAt -updatedAt",
    { skip, limit }
  );

  return res.status(200).json(data);
};

module.exports = getAll;
