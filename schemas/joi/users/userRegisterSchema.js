const Joi = require("joi");

const userRegisterSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
});


module.exports = userRegisterSchema