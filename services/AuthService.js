const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { User } = require("../models");
const { HttpError } = require("../helpers");

class AuthService {
  async registerNewUser (req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
      throw HttpError(409, `Email: ${email} is already in use`);
    }

    if (!email || !password) {
      throw HttpError(400, 'Please provide all the requested fields');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      ...req.body,
      password: hashPassword,
    });

    return newUser;

  }

  async login(req) {
    const { email, password } = req.body;

     if (!email || !password) {
       throw HttpError(400, "Please provide all the requested fields");
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401);
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401);
    }
    const { _id: id } = user;

     const payload = {
       id,
     };

     const token = jwt.sign(payload, process.env.SECRET_KEY, {
       expiresIn: "2h",
     });
    
    const theUser = await User.findByIdAndUpdate(id, { token }, {next: true});

    return theUser
    
  }

  async logout(req) {
    const { _id } = req.user;
  
    const user = await User.findByIdAndUpdate(_id, { token: "" }, {next: true});
    
    if (!user) {
      throw(HttpError(401, "Not authorized"))
    }

    return {
      code: 200,
      message: "Logout success",
    }
    
  }

}

module.exports = new AuthService();
