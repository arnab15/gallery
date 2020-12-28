if (process.env.NODE_ENV === "devlopment") {
  require("dotenv").config();
}
console.log(process.env.NODE_ENV);
const express = require("express");
const bodyParser = require("body-parser");
const methodOverRide = require("method-override");
const passport = require("passport");
const session = require("express-session");
const flash = require("express-flash");
require("./helpers/db_connection")();
const authRouter = require("./routers/authrouter");
const imageRouter = require("./routers/photoRouter");
const initializePassport = require("./helpers/passport_setup");
const { ImageModel } = require("./models/imageDetails");

initializePassport(passport);
const app = express();
app.set("view engine", "ejs");

app.use("/uploads", express.static("uploads"));
app.use(methodOverRide("_method"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
    },
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

app.get("/", async (req, res) => {
  try {
    const imgesData = await ImageModel.find({})
      .populate("author", "-password -email -__v")
      .sort({ description: -1 })
      .select();
    // console.log(req.user);
    req.flash("success", "Welcome to Gallery");
    return res.render("home", {
      data: imgesData,
    });
  } catch (error) {}
});
app.use("/", authRouter);
app.use("/", imageRouter);
app.use((req, res, next) => {
  res.render("error");
});
app.use((err, req, res, next) => {
  console.log(err.message);
  req.flash("error", "Something went wrong");
});
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
