const express = require("express");
const imgController = require("../controllers/imageController");
const upload = require("../helpers/multer");
const middleware = require("../middlewares/auth");
const router = express.Router();

router.get("/addphoto", middleware.checkLogedIn, (req, res) => {
  res.render("addPhoto", {
    error: {
      message: null,
    },
  });
});

router.post(
  "/addphoto",
  [middleware.checkLogedIn, upload.single("image")],
  imgController.addImge,
  (err, req, res, next) => {
    res.render("addPhoto", {
      error: {
        message: err.message,
      },
    });
    next(err);
  }
);

router.delete(
  "/addPhoto/:id",
  [middleware.checkLogedIn, middleware.checkPublisher],
  imgController.deleteImage
);
router.get("/myphotos", middleware.checkLogedIn, imgController.myphotos);

module.exports = router;
