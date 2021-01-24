const { ImageModel } = require("../models/imageDetails");
const {
  uploadImage,
  deleteFileFromBucket,
} = require("../helpers/cloudinary_file_upload");

const addImge = async (req, res, next) => {
  try {
    const { public_id, secure_url } = await uploadImage(
      req.file.path,
      "gallery"
    );

    const newImage = new ImageModel({
      url: secure_url,
      description: req.body.description,
      catagorey: req.body.catagorey,
      public_id,
      author: req.user._id,
    });

    await newImage.save();
    res.redirect("/");
  } catch (error) {
    res.redirect("/addPhoto");
  }
};
const deleteImage = async (req, res, next) => {
  try {
    const _id = req.params.id.trim();
    const imgExist = await ImageModel.findById(_id);
    if (!imgExist) return res.redirect("/");

    await deleteFileFromBucket(imgExist.public_id);
    await ImageModel.findByIdAndDelete(_id);

    res.redirect("/");
  } catch (error) {
    next(error);
    res.redirect("/");
  }
};

const myphotos = async (req, res, next) => {
  // console.log("my photos :", req.user);
  const images = ImageModel.find({}).populate("author", "_id name");
  const myImages = (await images).filter((img) => {
    return img.author._id.equals(req.user._id);
  });
  res.render("myphotos", { myImages: myImages });
  // console.log("My images :", myImages);
};

module.exports = {
  addImge,
  myphotos,
  deleteImage,
};
