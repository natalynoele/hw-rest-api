const messagesList = {
  400: "Bad Request",
  401: "Email or password is wrong",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict. Email is already in use",
};

const HttpError = (status, message = messagesList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = HttpError;


