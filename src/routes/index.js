const express = require("express");
const router = express.Router();

router.use("/materials", require("./materials.routes"));
router.use("/videos", require("./videos.routes"));
router.use("/quizzes", require("./quizzes.routes"));
router.use("/quiz-sessions", require("./sessions.routes"));

module.exports = router;
