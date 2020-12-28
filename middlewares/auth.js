const User = require("../models/user");
const { ImageModel } = require("../models/imageDetails");
const authMiddleWare = {};

authMiddleWare.checkPublisher = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must have to authanticate");
    res.redirect("/login");
    return;
  }
  const id = req.params.id;
  const imageExist = await ImageModel.findById(id).populate("author", "_id");
  if (!imageExist) return req.flash("error", "Invalid image details");

  const isEqual = imageExist.author._id.equals(req.user._id);
  if (!isEqual) {
    req.flash("error", "Invalid user details");
    return;
  }
  next();
};

authMiddleWare.checkLogedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  req.flash("error", "please login");
  res.redirect("/login");
  return;
};
module.exports = authMiddleWare;
