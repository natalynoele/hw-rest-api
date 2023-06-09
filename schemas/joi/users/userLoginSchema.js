const Joi = require("joi");

const userLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});


module.exports = userLoginSchema