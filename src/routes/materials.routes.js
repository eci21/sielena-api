const express = require("express");
const router = express.Router();
const { getMaterials } = require("../controllers/materials.controller");

router.get("/", getMaterials);

module.exports = router;
