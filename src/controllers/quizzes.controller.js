const Quiz = require("../models/Quiz");
const { connectDB } = require("../config/db"); // sesuaikan path db.js kamu

// GET /api/quizzes
exports.getAll = async (req, res) => {
  try {
    await connectDB();
    const quizzes = await Quiz.find().sort({ createdAt: 1 });
    return res.json(quizzes);
  } catch (err) {
    console.error("Gagal ambil quizzes:", err);
    return res.status(500).json({ message: "Gagal ambil quizzes", error: err.message });
  }
};

// GET /api/quizzes/:id
exports.getOne = async (req, res) => {
  try {
    await connectDB();
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz tidak ditemukan" });
    return res.json(quiz);
  } catch (err) {
    console.error("Gagal ambil quiz:", err);
    return res.status(500).json({ message: "Gagal ambil quiz", error: err.message });
  }
};

// POST /api/quizzes
exports.create = async (req, res) => {
  try {
    await connectDB();
    const { name, description, questions } = req.body;
    const quiz = await Quiz.create({ name, description, questions });
    return res.status(201).json(quiz);
  } catch (err) {
    console.error("Gagal buat quiz:", err);
    return res.status(500).json({ message: "Gagal buat quiz", error: err.message });
  }
};

// PUT /api/quizzes/:id
exports.update = async (req, res) => {
  try {
    await connectDB();
    const { name, description, questions } = req.body;
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { name, description, questions },
      { new: true }
    );
    if (!quiz) return res.status(404).json({ message: "Quiz tidak ditemukan" });
    return res.json(quiz);
  } catch (err) {
    console.error("Gagal update quiz:", err);
    return res.status(500).json({ message: "Gagal update quiz", error: err.message });
  }
};

// POST /api/quizzes/:id/questions
exports.addQuestion = async (req, res) => {
  try {
    await connectDB();
    const { text, options, correctIndex } = req.body;

    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz tidak ditemukan" });

    quiz.questions.push({ text, options, correctIndex });
    await quiz.save();

    return res.status(201).json(quiz);
  } catch (err) {
    console.error("Gagal tambah pertanyaan:", err);
    return res.status(500).json({ message: "Gagal tambah pertanyaan", error: err.message });
  }
};
