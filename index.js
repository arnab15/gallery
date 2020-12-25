require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const authRouter = require("./routers/authrouter");
const imageRouter = require("./routers/photoRouter");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("home");
});
app.use("/", authRouter);
app.use("/", imageRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
