const { BASE_URL } = process.env;

module.exports = (email, verificationToken) => {
  return {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`,
  };
};
