const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    items: [{ type: String, required: true }],
    description: { type: String } // penjelasan setelah poin-poin
  },
  { timestamps: true }
);

module.exports = mongoose.model("Material", materialSchema);
