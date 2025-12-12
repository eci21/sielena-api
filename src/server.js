require("dotenv").config();
const { connectDB } = require("./config/db");
const app = require("./app");

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`SIELENA API berjalan di port ${PORT}`);
    });
  } catch (err) {
    console.error("Gagal start server:", err.message);
    process.exit(1);
  }
}

start();
