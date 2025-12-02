const express = require("express");
const router = express.Router();
const {
  createSession,
  getSessionByCode,
  submitResult,
  getResultsBySession
} = require("../controllers/sessions.controller");

router.post("/", createSession);
router.get("/:code", getSessionByCode);
router.post("/:code/results", submitResult);
router.get("/:code/results", getResultsBySession);

module.exports = router;
