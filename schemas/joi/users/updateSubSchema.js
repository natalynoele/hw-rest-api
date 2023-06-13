const Joi = require("joi");

const updateSubSchema = Joi.object({
  subscription: Joi.string().required(),
});

module.exports = updateSubSchema;
