const Joi = require("joi");

const loginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});


module.exports = loginSchema