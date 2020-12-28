const User = require("../models/user");
const { hashPasword } = require("../helpers/hash_password");
const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.render("signup", {
        error: {
          message: "User with this email already exist",
        },
      });
      return;
    }
    const hashPsw = await hashPasword(password);
    const user = new User({
      name,
      email,
      password: hashPsw,
    });
    console.log(user);
    await user.save();
    res.redirect("/login");
  } catch (error) {
    res.render("signup", {
      error: {
        message: error.message,
      },
    });
  }
};

const login = (req, res, next) => {
  req.flash("success", "Welcome to Image gallery");
};

const logout = (req, res) => {
  req.logOut();
  res.redirect("/login");
};
module.exports = {
  login,
  signup,
  logout,
};
