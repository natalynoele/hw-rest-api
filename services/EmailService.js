const { HttpError, sendEmail, verifyEmail } = require("../helpers");
const { User } = require("../models");

class EmailService {
  async verify(req) {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw HttpError(401);
    }

    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: "",
    });

    return {
      message: "Verification successful",
    };
  }

  async resendVerify(req) {
    const { email } = req.body;

    if (!email) {
      throw HttpError(400, "Email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw HttpError(401);
    }

    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }

    const data = verifyEmail(email, user.verificationToken);

    await sendEmail(data);

    return {
      message: "Verification email was sent",
    };
  }
}

module.exports = new EmailService();
