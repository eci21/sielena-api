const Material = require("../models/Material");

// GET /api/materials
exports.getAll = async (req, res) => {
  try {
    const materials = await Material.find().sort({ createdAt: 1 });
    res.json(materials);
  } catch (err) {
    console.error("Gagal ambil materials:", err);
    res.status(500).json({ message: "Gagal ambil materials" });
  }
};

// POST /api/materials
exports.create = async (req, res) => {
  try {
    const { title, items, description } = req.body;
    const material = await Material.create({ title, items, description });
    res.status(201).json(material);
  } catch (err) {
    console.error("Gagal buat material:", err);
    res.status(500).json({ message: "Gagal buat material" });
  }
};
