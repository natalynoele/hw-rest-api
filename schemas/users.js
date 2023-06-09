const { Schema } = require("mongoose");

const Joi = require("joi");

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: String,
});

const userRegisterSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
  subscription: Joi.string(),
});

const userLoginSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const userJoiSchemas = {
  userRegisterSchema,
  userLoginSchema,
};

module.exports = {
  userSchema,
  userJoiSchemas,
};
