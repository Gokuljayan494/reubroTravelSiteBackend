const mongoose = require("mongoose");
const videoSchema = new mongoose.Schema({
  name: { type: String },
  video: { type: String, required: true },
});
VideoModel = mongoose.model("videoSchema", videoSchema);

module.exports = VideoModel;
