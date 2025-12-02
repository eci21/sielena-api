const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    duration: { type: String },
    url: { type: String, required: true } // link luar (YouTube/Drive)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Video", videoSchema);
