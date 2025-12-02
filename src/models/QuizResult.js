const mongoose = require("mongoose");

const quizResultSchema = new mongoose.Schema(
  {
    sessionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizSession",
      required: true
    },
    participantName: { type: String, required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuizResult", quizResultSchema);
