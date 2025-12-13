const Video = require("../models/Video");
const { connectDB } = require("../config/db"); // sesuaikan path

// GET /api/videos
exports.getAll = async (req, res) => {
  try {
    await connectDB(); // <-- penting
    const videos = await Video.find().sort({ createdAt: 1 });
    return res.json(videos);
  } catch (err) {
    console.error("Gagal ambil videos:", err);
    return res.status(500).json({ message: "Gagal ambil videos", error: err.message });
  }
};

// POST /api/videos
exports.create = async (req, res) => {
  try {
    await connectDB(); // <-- penting
    const { title, url, duration } = req.body;
    const video = await Video.create({ title, url, duration });
    return res.status(201).json(video);
  } catch (err) {
    console.error("Gagal buat video:", err);
    return res.status(500).json({ message: "Gagal buat video", error: err.message });
  }
};
