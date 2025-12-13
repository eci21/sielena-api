const Quiz = require("../models/Quiz");
const QuizSession = require("../models/QuizSession");
const QuizResult = require("../models/QuizResult");
const { connectDB } = require("../config/db"); // <- sesuaikan

function generateCode(length = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < length; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

async function generateUniqueCode(length = 6, maxTry = 10) {
  for (let i = 0; i < maxTry; i++) {
    const code = generateCode(length);
    const exists = await QuizSession.exists({ code });
    if (!exists) return code;
  }
  throw new Error("Gagal membuat kode unik, coba lagi.");
}

// POST /api/quiz-sessions
// Body: { quizId, schoolName, className }
exports.createSession = async (req, res) => {
  try {
    await connectDB();

    const { quizId, schoolName, className } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz tidak ditemukan" });

    const code = await generateUniqueCode(6);

    const session = await QuizSession.create({
      code,
      quiz: quiz._id,
      schoolName,
      className
    });

    return res.status(201).json({ code: session.code, sessionId: session._id });
  } catch (err) {
    console.error("Gagal membuat sesi kuis:", err);
    return res.status(500).json({ message: "Gagal membuat sesi kuis", error: err.message });
  }
};

// GET /api/quiz-sessions/:code
exports.getByCode = async (req, res) => {
  try {
    await connectDB();

    const session = await QuizSession
      .findOne({ code: req.params.code })
      .populate("quiz");

    if (!session) return res.status(404).json({ message: "Sesi tidak ditemukan" });

    return res.json(session);
  } catch (err) {
    console.error("Gagal ambil sesi:", err);
    return res.status(500).json({ message: "Gagal ambil sesi", error: err.message });
  }
};

// POST /api/quiz-sessions/:code/results
// Body: { participantName, studentId, answers: [{ questionId, chosenIndex }] }
exports.submitResult = async (req, res) => {
  try {
    await connectDB();

    const { participantName, studentId, answers } = req.body;

    const session = await QuizSession
      .findOne({ code: req.params.code })
      .populate("quiz");

    if (!session) return res.status(404).json({ message: "Sesi tidak ditemukan" });

    // Cegah submit dobel (opsional tapi bagus)
    const already = await QuizResult.exists({ session: session._id, studentId });
    if (already) return res.status(409).json({ message: "StudentId ini sudah pernah submit." });

    const quizQuestions = session.quiz.questions;
    const detailedAnswers = [];
    let correctCount = 0;

    for (const ans of (answers || [])) {
      const q = quizQuestions.id(ans.questionId);
      if (!q) continue;

      const isCorrect = q.correctIndex === ans.chosenIndex;
      if (isCorrect) correctCount++;

      detailedAnswers.push({
        questionId: q._id,
        chosenIndex: ans.chosenIndex,
        isCorrect
      });
    }

    const total = quizQuestions.length || 1;
    const score = Math.round((correctCount / total) * 100);

    const result = await QuizResult.create({
      session: session._id,
      participantName,
      studentId,
      score,
      answers: detailedAnswers
    });

    return res.status(201).json(result);
  } catch (err) {
    console.error("Gagal simpan hasil kuis:", err);
    return res.status(500).json({ message: "Gagal simpan hasil kuis", error: err.message });
  }
};

// GET /api/quiz-sessions/:code/results
exports.getResults = async (req, res) => {
  try {
    await connectDB();

    const session = await QuizSession.findOne({ code: req.params.code });
    if (!session) return res.status(404).json({ message: "Sesi tidak ditemukan" });

    const results = await QuizResult
      .find({ session: session._id })
      .sort({ createdAt: 1 });

    return res.json(results);
  } catch (err) {
    console.error("Gagal ambil hasil kuis:", err);
    return res.status(500).json({ message: "Gagal ambil hasil kuis", error: err.message });
  }
};
