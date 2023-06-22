const path = require("path")

const subscriptionOptions = ["starter", "pro", "business"];
const AVATARS_DIR = path.join(__dirname, "..", "public", "avatars")
const TEMP_DIR = path.join(__dirname, "..", "temp")
  

module.exports = {
  subscriptionOptions,
  AVATARS_DIR,
  TEMP_DIR
};
