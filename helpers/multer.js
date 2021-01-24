const multer = require("multer");

const upload = multer({
  storage: multer.diskStorage({}),
  limits: {
    fileSize: 1024 * 1024 * 5,
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
