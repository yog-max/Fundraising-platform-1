const mongoose = require("mongoose");

// Define the Campaign schema with embedded bank details and investor contributions
const campaignSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  goalAmount: {
    type: Number,
    required: true,
  },
  currentAmount: {
    type: Number,
    default: 0,
  },
  withdrawnAmount: {
    type: Number,
    default: 0,
  },
  withdrawalRequests: [
    {
      requestedAmount: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
      },
      requestDate: {
        type: Date,
        default: Date.now,
      },
      approvalDate: {
        type: Date,
      },
      rejectionReason: {
        type: String,
      },
    },
  ],
  image: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected", "Completed"],
    default: "Pending",
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Link to the User (Fundraiser)
  },
  investorsApproached: [
    {
      investorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Link to the Investors (User model)
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
    },
  ],
  bankDetails: {
    bankName: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: String,
      required: true,
    },
    ifscCode: {
      type: String,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Campaign = mongoose.model("Campaign", campaignSchema);
module.exports = Campaign;
