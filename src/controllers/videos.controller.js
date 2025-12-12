const Video = require("../models/Video");

// GET /api/videos
exports.getAll = async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: 1 });
    res.json(videos);
  } catch (err) {
    console.error("Gagal ambil videos:", err);
    res.status(500).json({ message: "Gagal ambil videos" });
  }
};

// POST /api/videos
exports.create = async (req, res) => {
  try {
    const { title, url, duration } = req.body;
    const video = await Video.create({ title, url, duration });
    res.status(201).json(video);
  } catch (err) {
    console.error("Gagal buat video:", err);
    res.status(500).json({ message: "Gagal buat video" });
  }
};
