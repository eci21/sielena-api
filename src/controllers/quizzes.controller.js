// src/controllers/quizzes.controller.js
const Quiz = require("../models/Quiz");

// GET /api/quizzes  → untuk list di homepage / halaman kuis
exports.getQuizzes = async (req, res) => {
  try {
    const data = await Quiz.find().sort({ createdAt: 1 });

    // kalau mau, kirim juga jumlah soal per kuis
    const mapped = data.map((q) => ({
      id: q._id,
      name: q.name,
      questions: q.questions.length  // FE kamu pakai field ini
    }));

    res.json(mapped);
  } catch (err) {
    console.error("Gagal ambil quizzes:", err);
    res.status(500).json({ message: "Gagal mengambil data kuis" });
  }
};

// GET /api/quizzes/:id → lihat 1 kuis + daftar soal lengkap
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz tidak ditemukan" });
    }
    res.json(quiz);
  } catch (err) {
    console.error("Gagal ambil quiz:", err);
    res.status(500).json({ message: "Gagal mengambil quiz" });
  }
};

// POST /api/quizzes  → bikin kuis baru (kalau mau dari Postman)
exports.createQuiz = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Nama kuis wajib diisi" });
    }
    const quiz = await Quiz.create({ name, questions: [] });
    res.status(201).json(quiz);
  } catch (err) {
    console.error("Gagal buat quiz:", err);
    res.status(500).json({ message: "Gagal membuat quiz" });
  }
};

// POST /api/quizzes/:id/questions  → TAMBAH SOAL ke kuis
exports.addQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, options, correctIndex } = req.body;

    if (!text || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({
        message: "text wajib diisi dan options minimal 2 pilihan"
      });
    }

    if (typeof correctIndex !== "number" || correctIndex < 0 || correctIndex >= options.length) {
      return res.status(400).json({
        message: "correctIndex harus angka index salah satu options"
      });
    }

    const quiz = await Quiz.findById(id);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz tidak ditemukan" });
    }

    quiz.questions.push({ text, options, correctIndex });
    await quiz.save();

    res.status(201).json(quiz);
  } catch (err) {
    console.error("Gagal tambah soal:", err);
    res.status(500).json({ message: "Gagal menambahkan soal" });
  }
};
