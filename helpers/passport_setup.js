const LocalStratigy = require("passport-local").Strategy;
const passport = require("passport");
const User = require("../models/user");
const { comparePasword } = require("./hash_password");

const initializePassport = () => {
  const authanticateUser = async (email, password, done) => {
    const user = await User.findOne({ email });
    if (!user) return done(null, false, { message: "User not found" });
    const isMatch = await comparePasword(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: "Invalid password" });
    }
    done(null, user);
  };

  passport.use(new LocalStratigy({ usernameField: "email" }, authanticateUser));

  passport.serializeUser((user, done) => {
    // console.log("Serialize User:", user._id);
    return done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const userExist = await User.findById({ _id: id }).select("-password");
    // console.log("deserialiseuser:", id);
    if (!userExist) return done(null, false, { message: "Invalid user id" });
    return done(null, userExist);
  });
};

module.exports = initializePassport;
