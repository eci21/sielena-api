const mongoose = require("mongoose");

const quizSessionSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    schoolName: { type: String },
    className: { type: String },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("QuizSession", quizSessionSchema);
