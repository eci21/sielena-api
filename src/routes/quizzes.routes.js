const express = require("express");
const controller = require("../controllers/quizzes.controller");

const router = express.Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getOne);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.post("/:id/questions", controller.addQuestion);

module.exports = router;
