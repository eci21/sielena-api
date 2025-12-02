// src/config/db.js
const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("MONGODB_URI belum diset di .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("Terhubung ke MongoDB Atlas");
  } catch (err) {
    console.error("Gagal konek MongoDB:", err.message);
    process.exit(1);
  }
}

module.exports = { connectDB };
