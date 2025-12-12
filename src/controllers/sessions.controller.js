const { customAlphabet } = require("nanoid");
const Quiz = require("../models/Quiz");
const QuizSession = require("../models/QuizSession");
const QuizResult = require("../models/QuizResult");

const nanoid = customAlphabet("ABCDEFGHJKLMNPQRSTUVWXYZ23456789", 6);

// POST /api/quiz-sessions
// Body: { quizId, schoolName, className }
exports.createSession = async (req, res) => {
  try {
    const { quizId, schoolName, className } = req.body;

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz tidak ditemukan" });

    const code = nanoid();
    const session = await QuizSession.create({
      code,
      quiz: quiz._id,
      schoolName,
      className
    });

    res.status(201).json({ code: session.code, sessionId: session._id });
  } catch (err) {
    console.error("Gagal membuat sesi kuis:", err);
    res.status(500).json({ message: "Gagal membuat sesi kuis" });
  }
};

// GET /api/quiz-sessions/:code
exports.getByCode = async (req, res) => {
  try {
    const session = await QuizSession.findOne({ code: req.params.code }).populate(
      "quiz"
    );
    if (!session) {
      return res.status(404).json({ message: "Sesi tidak ditemukan" });
    }
    res.json(session);
  } catch (err) {
    console.error("Gagal ambil sesi:", err);
    res.status(500).json({ message: "Gagal ambil sesi" });
  }
};

// POST /api/quiz-sessions/:code/results
// Body: { participantName, studentId, answers: [{ questionId, chosenIndex }] }
exports.submitResult = async (req, res) => {
  try {
    const { participantName, studentId, answers } = req.body;
    const session = await QuizSession.findOne({ code: req.params.code }).populate(
      "quiz"
    );

    if (!session) {
      return res.status(404).json({ message: "Sesi tidak ditemukan" });
    }

    const quizQuestions = session.quiz.questions;
    const detailedAnswers = [];
    let correctCount = 0;

    for (const ans of answers) {
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

    res.status(201).json(result);
  } catch (err) {
    console.error("Gagal simpan hasil kuis:", err);
    res.status(500).json({ message: "Gagal simpan hasil kuis" });
  }
};

// GET /api/quiz-sessions/:code/results
exports.getResults = async (req, res) => {
  try {
    const session = await QuizSession.findOne({ code: req.params.code });
    if (!session) {
      return res.status(404).json({ message: "Sesi tidak ditemukan" });
    }

    const results = await QuizResult.find({ session: session._id }).sort({
      createdAt: 1
    });

    res.json(results);
  } catch (err) {
    console.error("Gagal ambil hasil kuis:", err);
    res.status(500).json({ message: "Gagal ambil hasil kuis" });
  }
};
