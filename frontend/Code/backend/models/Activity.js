// models/Activity.js
const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  actor: { type: String, required: true, ref: "User" },
  action: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Activity", activitySchema);
