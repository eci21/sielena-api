// src/config/db.js
const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  console.log("DEBUG DB: MONGODB_URI ada?", !!uri);

  if (!uri) {
    console.error("MONGODB_URI belum diset di environment (Vercel / .env)");
    return;
  }

  if (isConnected) {
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // biar error cepat keluar
    });
    isConnected = true;
    console.log("Terhubung ke MongoDB Atlas di host:", conn.connection.host);
  } catch (err) {
    console.error("MongoDB connection error:", err.name, err.message);
  }
}

module.exports = { connectDB };
