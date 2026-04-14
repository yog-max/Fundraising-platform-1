const Campaign = require("../models/Campaign"); // Adjust the path to your Campaign model

// All campaigns
const getCampaigns = async (req, res) => {
  try {
    // Save the campaign
    const campaign = await Campaign.find({
      status: "Approved",
    }).populate("creator"); // Populate the creator field

    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getCampaignById = async (req, res) => {
  try {
    // Save the campaign
    const campaign = await Campaign.findOne({
      _id: req.params.id,
    }).populate("creator"); // Populate the creator field

    res.status(201).json(campaign);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error", error });
  }
};

// profile
const getCampaignsByCreator = async (req, res) => {
  try {
    // Save the campaign
    const campaign = await Campaign.find({
      creator: req.user._id,
    }).populate("creator"); // Populate the creator field

    res.status(201).json(campaign);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Create a new campaign
const createCampaign = async (req, res) => {
  try {
    const { title, description, goalAmount, image, bankDetails } = req.body;

    // Create a new campaign linked to the logged-in user (req.user._id)
    const newCampaign = new Campaign({
      title,
      description,
      goalAmount,
      image,
      bankDetails,
      creator: req.user._id, // Set creator as the logged-in user
    });

    // Save the campaign
    const campaign = await newCampaign.save();

    req.user.campaignsCreated.push(campaign._id);
    req.user.save();

    res.status(201).json(campaign);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update an existing campaign
const updateCampaign = async (req, res) => {
  try {
    const { id } = req.params; // Get campaign ID from URL parameters
    const { title, description, goalAmount, image } = req.body;

    // Find the campaign by ID and ensure the logged-in user is the creator
    const campaign = await Campaign.findById(id);

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Ensure only the creator can update the campaign
    if (campaign.creator.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this campaign" });
    }

    // Update the campaign fields
    campaign.title = title || campaign.title;
    campaign.description = description || campaign.description;
    campaign.goalAmount = goalAmount || campaign.goalAmount;
    campaign.image = image || campaign.image;

    // Save the updated campaign
    const updatedCampaign = await campaign.save();

    res.status(200).json(updatedCampaign);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Add a new withdrawal request
const addWithdrawalRequest = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { requestedAmount } = req.body;
    const userId = req.user._id; // Assuming `req.user` contains authenticated user data from the auth middleware

    // Find the campaign by its ID
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Ensure the campaign creator is making the request
    if (campaign.creator.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized to make this request" });
    }

    // Check if the requested amount is available for withdrawal
    if (requestedAmount > campaign.currentAmount - campaign.withdrawnAmount) {
      return res.status(400).json({ message: "Insufficient funds available for withdrawal" });
    }

    // Create a new withdrawal request
    const newRequest = {
      requestedAmount,
      status: "Pending",
      requestDate: new Date(),
    };

    // Add the request to the campaign's withdrawalRequests array
    campaign.withdrawalRequests.push(newRequest);

    // Save the updated campaign
    await campaign.save();

    res.status(200).json({
      message: "Withdrawal request added successfully",
      withdrawalRequest: newRequest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createCampaign,
  updateCampaign,
  getCampaigns,
  getCampaignsByCreator,
  getCampaignById,
  addWithdrawalRequest,
};
