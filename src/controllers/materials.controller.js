const Material = require("../models/Material");

exports.getMaterials = async (req, res) => {
  try {
    const data = await Material.find().sort({ createdAt: 1 });
    res.json(data);
  } catch (err) {
    console.error("Gagal ambil materials:", err);
    res.status(500).json({ message: "Gagal mengambil data materi" });
  }
};
