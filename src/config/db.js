const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI belum diset di environment");
    throw new Error("MONGODB_URI missing");
  }

  try {
    await mongoose.connect(uri);
    console.log("Terhubung ke MongoDB Atlas");
  } catch (err) {
    console.error("MongoDB connection error:", err.name, err.message);
    throw err;
  }
}

module.exports = { connectDB };
