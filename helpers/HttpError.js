const messagesList = {
  400: "Bad Request",
  401: "Email or password is wrong",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
};


const HttpError = (status, message = messagesList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};


// const HttpError = (status, message) => {
//   const error = new Error(message);
//   error.status = status;
//   return error;
// };

module.exports = HttpError;


