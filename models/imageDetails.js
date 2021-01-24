const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const imageSchema = new Schema({
  url: {
    required: true,
    unique: true,
    trim: true,
    type: String,
  },
  description: {
    trim: true,
    type: String,
    maxlength: 300,
  },
  catagorey: {
    required: true,
    trim: true,
    type: String,
    maxlength: 100,
  },
  public_id: {
    required: true,
    trim: true,
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
exports.ImageModel = mongoose.model("image", imageSchema);
