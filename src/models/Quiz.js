// src/models/Quiz.js
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    text: { type: String, required: true },        // isi soal
    options: [{ type: String, required: true }],   // pilihan jawaban
    correctIndex: { type: Number, required: true } // index jawaban benar (0,1,2,3)
  },
  { _id: false }
);

const quizSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    questions: [questionSchema] // <- di sini soal-soalnya
  },
  { timestamps: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
