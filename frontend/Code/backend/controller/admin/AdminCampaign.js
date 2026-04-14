const Campaign = require("../../models/Campaign"); // Adjust the path to your Campaign model

// All campaigns
const getCampaigns = async (req, res) => {
  try {
    // Save the campaign
    const campaign = await Campaign.find({}).populate("creator"); // Populate the creator field

    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update an existing campaign
const updateCampaign = async (req, res) => {
  try {
    const { id } = req.params; // Get campaign ID from URL parameters

    // Find the campaign by ID and ensure the logged-in user is the creator
    const campaign = await Campaign.findByIdAndUpdate(id, req.body);

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json(campaign);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  getCampaigns,
  updateCampaign,
};
