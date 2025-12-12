const express = require("express");
const controller = require("../controllers/sessions.controller");

const router = express.Router();

router.post("/", controller.createSession);
router.get("/:code", controller.getByCode);
router.post("/:code/results", controller.submitResult);
router.get("/:code/results", controller.getResults);

module.exports = router;
