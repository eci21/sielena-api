const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema(
  {
    questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
    chosenIndex: { type: Number, required: true },
    isCorrect: { type: Boolean, required: true }
  },
  { _id: false }
);

const quizResultSchema = new mongoose.Schema(
  {
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuizSession",
      required: true
    },
    participantName: { type: String, required: true },
    studentId: { type: String },
    score: { type: Number, required: true },
    answers: [answerSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuizResult", quizResultSchema);
