const { userLoginSchema, userRegisterSchema } = require("./users");

const {addSchema, updateFavoriteSchema } = require("./contacts")

module.exports = {
  userLoginSchema,
  userRegisterSchema,
  addSchema,
  updateFavoriteSchema
};
