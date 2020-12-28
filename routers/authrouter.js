const express = require("express");
const authController = require("../controllers/authcontroller");
const router = express.Router();
const passport = require("passport");
router.get("/login", (req, res) => {
  res.render("login", {
    error: {
      message: null,
    },
  });
});
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  authController.login
);
router.get("/signup", (req, res) => {
  res.render("signup", {
    error: {
      message: null,
    },
  });
});
router.post("/signup", authController.signup);
router.get("/logout", authController.logout);
module.exports = router;
