const express = require("express");
const {
  getCampaigns,
  updateCampaign,
} = require("../../controller/admin/AdminCampaign"); // Adjust the path to your controller

const router = express.Router();

// Create a new campaign
router.get("/", getCampaigns);
router.patch("/:id", updateCampaign);

module.exports = router;
