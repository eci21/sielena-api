// src/config/db.js
const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    console.error("MONGODB_URI belum diset di environment (Vercel / .env)");
    return; // JANGAN process.exit, cukup keluar fungsi
  }

  if (isConnected) {
    // Supaya tidak connect ulang tiap request di Vercel
    return;
  }

  try {
    const conn = await mongoose.connect(uri);
    isConnected = true;
    console.log("Terhubung ke MongoDB Atlas di:", conn.connection.host);
  } catch (err) {
    console.error("Gagal konek MongoDB:", err.message);
    // di serverless, cukup log error-nya
  }
}

module.exports = { connectDB };
