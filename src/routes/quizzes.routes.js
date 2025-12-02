// src/routes/quizzes.routes.js
const express = require("express");
const router = express.Router();
const {
  getQuizzes,
  getQuizById,
  createQuiz,
  addQuestion
} = require("../controllers/quizzes.controller");

// daftar kuis
router.get("/", getQuizzes);

// bikin kuis baru (opsional, bisa dari Postman)
router.post("/", createQuiz);

// detail satu kuis (termasuk soal)
router.get("/:id", getQuizById);

// tambah soal ke kuis tertentu
router.post("/:id/questions", addQuestion);

module.exports = router;
