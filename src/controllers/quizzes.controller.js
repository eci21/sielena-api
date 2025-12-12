const Quiz = require("../models/Quiz");

// GET /api/quizzes
exports.getAll = async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: 1 });
    res.json(quizzes);
  } catch (err) {
    console.error("Gagal ambil quizzes:", err);
    res.status(500).json({ message: "Gagal ambil quizzes" });
  }
};

// GET /api/quizzes/:id
exports.getOne = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz tidak ditemukan" });
    res.json(quiz);
  } catch (err) {
    console.error("Gagal ambil quiz:", err);
    res.status(500).json({ message: "Gagal ambil quiz" });
  }
};

// POST /api/quizzes
// Body: { name, description, questions: [{ text, options, correctIndex }] }
exports.create = async (req, res) => {
  try {
    const { name, description, questions } = req.body;
    const quiz = await Quiz.create({ name, description, questions });
    res.status(201).json(quiz);
  } catch (err) {
    console.error("Gagal buat quiz:", err);
    res.status(500).json({ message: "Gagal buat quiz" });
  }
};

// PUT /api/quizzes/:id
exports.update = async (req, res) => {
  try {
    const { name, description, questions } = req.body;
    const quiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      { name, description, questions },
      { new: true }
    );
    if (!quiz) return res.status(404).json({ message: "Quiz tidak ditemukan" });
    res.json(quiz);
  } catch (err) {
    console.error("Gagal update quiz:", err);
    res.status(500).json({ message: "Gagal update quiz" });
  }
};

// POST /api/quizzes/:id/questions
exports.addQuestion = async (req, res) => {
  try {
    const { text, options, correctIndex } = req.body;
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ message: "Quiz tidak ditemukan" });

    quiz.questions.push({ text, options, correctIndex });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    console.error("Gagal tambah pertanyaan:", err);
    res.status(500).json({ message: "Gagal tambah pertanyaan" });
  }
};
