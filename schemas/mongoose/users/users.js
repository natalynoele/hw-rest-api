const { Schema } = require("mongoose");

const {subscriptionOptions}= require("../../../constants/users")

const userSchema = new Schema(
  {
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
      enum: subscriptionOptions,
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);


module.exports = userSchema