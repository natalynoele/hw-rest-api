const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

// const errorHandler = require("./middlewares/errorHandler")
const {HttpError } =require("./helpers")

const { contactsRouter, authRouter } = require("./routes/api");

const app = express();

app.use(express.urlencoded({ extended: false }));

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use("/api/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});


app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  res.status(statusCode);
  res.json({ code: statusCode, stack: err.stack, message: err.message });
});

module.exports = app;
