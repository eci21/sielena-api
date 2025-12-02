const Quiz = require("../models/Quiz");
const QuizSession = require("../models/QuizSession");
const QuizResult = require("../models/QuizResult");

function generateSessionCode() {
  return Math.random().toString(36).substr(2, 4).toUpperCase();
}

// POST /api/quiz-sessions
exports.createSession = async (req, res) => {
  try {
    const { quizId } = req.body;
    if (!quizId) {
      return res.status(400).json({ message: "quizId wajib diisi" });
    }

    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz tidak ditemukan" });
    }

    const code = generateSessionCode();

    const session = await QuizSession.create({
      code,
      quizId: quiz._id
    });

    res.status(201).json(session);
  } catch (err) {
    console.error("Gagal buat sesi:", err);
    res.status(500).json({ message: "Gagal membuat sesi kuis" });
  }
};

// GET /api/quiz-sessions/:code
exports.getSessionByCode = async (req, res) => {
  try {
    const { code } = req.params;

    const session = await QuizSession.findOne({ code }).populate("quizId");
    if (!session) {
      return res.status(404).json({ message: "Sesi tidak ditemukan" });
    }

    res.json({
      id: session._id,
      code: session.code,
      quizId: session.quizId._id,
      quizName: session.quizId.name,
      createdAt: session.createdAt
    });
  } catch (err) {
    console.error("Gagal ambil sesi:", err);
    res.status(500).json({ message: "Gagal mengambil data sesi" });
  }
};

// POST /api/quiz-sessions/:code/results
exports.submitResult = async (req, res) => {
  try {
    const { code } = req.params;
    const { participantName, score, totalQuestions } = req.body;

    const session = await QuizSession.findOne({ code });
    if (!session) {
      return res.status(404).json({ message: "Sesi tidak ditemukan" });
    }

    const result = await QuizResult.create({
      sessionId: session._id,
      participantName,
      score,
      totalQuestions
    });

    res.status(201).json(result);
  } catch (err) {
    console.error("Gagal simpan hasil:", err);
    res.status(500).json({ message: "Gagal menyimpan hasil kuis" });
  }
};

// GET /api/quiz-sessions/:code/results
exports.getResultsBySession = async (req, res) => {
  try {
    const { code } = req.params;

    const session = await QuizSession.findOne({ code });
    if (!session) {
      return res.status(404).json({ message: "Sesi tidak ditemukan" });
    }

    const results = await QuizResult.find({ sessionId: session._id }).sort({
      score: -1,
      createdAt: 1
    });

    res.json({
      session: {
        id: session._id,
        code: session.code
      },
      results
    });
  } catch (err) {
    console.error("Gagal ambil hasil sesi:", err);
    res.status(500).json({ message: "Gagal mengambil hasil kuis" });
  }
};
