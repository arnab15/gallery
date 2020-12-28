const { ImageModel } = require("../models/imageDetails");
const { deleteFIle } = require("../helpers/delete_Img");
const addImge = async (req, res, next) => {
  const newImage = new ImageModel({
    url: req.file.path,
    description: req.body.description,
    catagorey: req.body.catagorey,
    author: req.user._id,
  });
  try {
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
    const fileDeleted = await deleteFIle(imgExist.url);
    console.log(fileDeleted);
    const doc = await ImageModel.findByIdAndDelete(_id);
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
