const mongoose = require("mongoose");

const quizSessionSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true }, // contoh: X7P9
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuizSession", quizSessionSchema);
