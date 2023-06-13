const { model } = require("mongoose")

const { userSchema } = require("../schemas/mongoose")

const User = model("user", userSchema)

module.exports = User