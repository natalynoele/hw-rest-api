const Joi = require("joi");

const registerSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
  verify: Joi.boolean(),
  verificationCode: Joi.string(),
});

module.exports = registerSchema;
