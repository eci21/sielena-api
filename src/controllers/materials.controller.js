const Material = require("../models/Material");
const { connectDB } = require("../config/db"); // sesuaikan path db.js kamu

// GET /api/materials
exports.getAll = async (req, res) => {
  try {
    await connectDB(); // <-- penting!
    const materials = await Material.find().sort({ createdAt: 1 });
    return res.json(materials);
  } catch (err) {
    console.error("Gagal ambil materials:", err);
    return res.status(500).json({ message: "Gagal ambil materials", error: err.message });
  }
};

// POST /api/materials
exports.create = async (req, res) => {
  try {
    await connectDB(); // <-- penting!
    const { title, items, description } = req.body;
    const material = await Material.create({ title, items, description });
    return res.status(201).json(material);
  } catch (err) {
    console.error("Gagal buat material:", err);
    return res.status(500).json({ message: "Gagal buat material", error: err.message });
  }
};
