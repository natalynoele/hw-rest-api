const app = require("./app");
require("colors");

const connectDB = require("./config/connectDB");

const { DB_HOST, PORT } = process.env;

connectDB(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`.blue.bold);
    });
  })
  .catch((error) => {
    console.log(error.message.red.bold);
    process.exit(1);
  });
