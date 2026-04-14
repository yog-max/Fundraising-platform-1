const mongoose = require("mongoose");

// Define the Investment schema
const investmentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  investor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Link to the User (Investor)
  },
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign", // Link to the Campaign being invested in
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed"],
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Investment = mongoose.model("Investment", investmentSchema);
module.exports = Investment;
