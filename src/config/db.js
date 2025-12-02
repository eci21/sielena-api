const mongoose = require("mongoose");

let isConnected = false;

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  console.log("DEBUG MONGO: MONGODB_URI ADA?", !!uri);

  if (!uri) {
    console.error("MONGODB_URI belum diset di environment");
    return;
  }

  if (isConnected) return;

  // log host cluster (tanpa user/pass)
  const [, afterAt] = uri.split("@");
  console.log("DEBUG MONGO HOST:", afterAt);

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    isConnected = true;
    console.log("Terhubung ke MongoDB Atlas di host:", conn.connection.host);
  } catch (err) {
    console.error("MongoDB connection error:", err.name, err.message);
  }
}

module.exports = { connectDB };
