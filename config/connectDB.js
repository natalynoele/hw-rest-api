const { connect } = require("mongoose");

const connectDB = async (host) => {
  try {
    const db = await connect(host);
    console.log(
      `Database is connected. Name:${db.connection.name}. Port:${db.connection.port}. Host:${db.connection.host}`
        .green.italic.bold
    );
  } catch (error) {
    console.log(error.message.red.bold);
  }
};

module.exports = connectDB;
