const {ctrlWrapper} = require("../../helpers")

const add = require("./add")
const getAll = require("./getAll")
const getById = require("./getById")
const updateById = require("./updateById")
const removeById = require("./removeById")
const updateStatusContact = require("./updateStatusContact")


module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  add: ctrlWrapper(add),
  removeById: ctrlWrapper(removeById),
};



