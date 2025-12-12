const express = require("express");
const materialsRoutes = require("./materials.routes");
const videosRoutes = require("./videos.routes");
const quizzesRoutes = require("./quizzes.routes");
const sessionsRoutes = require("./sessions.routes");

const router = express.Router();

router.use("/materials", materialsRoutes);
router.use("/videos", videosRoutes);
router.use("/quizzes", quizzesRoutes);
router.use("/quiz-sessions", sessionsRoutes);

module.exports = router;
