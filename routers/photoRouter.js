const express = require("express");
const authController = require("../controllers/authcontroller");
const upload = require("../helpers/img_upload");
const router = express.Router();
router.get("/addphoto", (req, res) => {
  res.render("addPhoto");
});
router.post(
  "/addphoto",
  upload.single("image"),
  (req, res) => {
    console.log(req.file);
  },
  (err, req, res, next) => {
    console.log(err);
  }
);

module.exports = router;
