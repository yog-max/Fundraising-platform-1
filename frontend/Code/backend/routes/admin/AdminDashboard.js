const express = require("express");
const User = require("../../models/User");
const Campaign = require("../../models/Campaign");
const Investment = require("../../models/Investment");

const router = express.Router();

// Define the route to get dashboard stats
router.get("/stats", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({});
    const totalCampaigns = await Campaign.countDocuments({});
    const totalInvestments = await Investment.countDocuments({});
    const totalPendingWithdrawals = await Campaign.aggregate([
      { $unwind: "$withdrawalRequests" },
      { $match: { "withdrawalRequests.status": "Pending" } },
      { $count: "pendingWithdrawals" },
    ]);

    return res.status(200).json({
      totalUsers,
      totalCampaigns,
      totalInvestments,
      totalPendingWithdrawals:
        totalPendingWithdrawals[0]?.pendingWithdrawals || 0,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error fetching dashboard data" });
  }
});

module.exports = router;
