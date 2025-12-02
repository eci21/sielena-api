const Video = require("../models/Video");

exports.getVideos = async (req, res) => {
  try {
    const data = await Video.find().sort({ createdAt: 1 });
    res.json(data);
  } catch (err) {
    console.error("Gagal ambil videos:", err);
    res.status(500).json({ message: "Gagal mengambil data video" });
  }
};
