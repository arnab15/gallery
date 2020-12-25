const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const storageStratigy = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storageStratigy,
  limits: {
    fileSize: 1024 * 1024 * 1,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error("please upload a jpeg or png image"), false);
      return;
    }
    cb(undefined, true);
  },
});

module.exports = upload;
