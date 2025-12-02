// server.js
require("dotenv").config();
const { connectDB } = require("./src/config/db");
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

async function start() {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`SIELENA API berjalan di http://localhost:${PORT}`);
  });
}

start();
