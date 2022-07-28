const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    ppdvId: { type: Number, required: true, unique: true },
    lastVisit: { type: Date },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Person", PersonSchema);
