const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "..", "temp");

const multerConfig = multer({
  destination: tempDir,
});

const upload = multer({
  storage: multerConfig,
});

module.exports = upload;
