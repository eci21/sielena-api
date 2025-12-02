// src/app.js
const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { connectDB } = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// panggil connectDB sekali saat app di-load
connectDB().catch((err) => {
  console.error("Gagal inisialisasi koneksi DB:", err.message);
});

app.get("/", (req, res) => {
  res.json({ message: "SIELENA API (MongoDB) aktif" });
});

app.use("/api", routes);

module.exports = app;
