const express = require("express");
const {
  createCampaign,
  updateCampaign,
  getCampaigns,
  getCampaignsByCreator,
  getCampaignById,
  addWithdrawalRequest,
} = require("../controller/Campaign"); // Adjust the path to your controller
const { auth } = require("../middleware/Auth"); // Protect routes to ensure user is authenticated

const router = express.Router();

// Create a new campaign
router.get("/", getCampaigns);

// Update an existing campaign (protected route)
router.get("/campaignbyid/:id", getCampaignById);

// profile
// All campaigns by creator
router.get("/campaignsbycreator", auth, getCampaignsByCreator);

// Create a new campaign (protected route)
router.post("/create", auth, createCampaign);

// Update an existing campaign (protected route)
router.put("/update/:id", auth, updateCampaign);

// Route to add a new withdrawal request
router.post("/withdrawal/:campaignId", auth, addWithdrawalRequest);

module.exports = router;
