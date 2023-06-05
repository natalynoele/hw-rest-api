const Joi = require("joi")
const { Schema } = require("mongoose")

const {handleMongooseError} = require("../helpers")

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean()
  });

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post("save", handleMongooseError);

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const contactsSchemas = {
  addSchema,
  updateFavoriteSchema,
};

module.exports = {  
  contactSchema,
  contactsSchemas  
};