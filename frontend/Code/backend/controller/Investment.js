const Razorpay = require("razorpay");
const Investment = require("../models/Investment");
const Campaign = require("../models/Campaign");
const crypto = require("crypto");
const { keys } = require("../keys/razorPay");

const razorpay = new Razorpay({
  key_id: keys.key_id,
  key_secret: keys.key_secret,
});

// Create a new investment and initiate Razorpay payment
const createInvestment = async (req, res) => {
  try {
    const { amount, campaignId } = req.body;

    // Find the campaign being invested in
    const campaign = await Campaign.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Create a new investment (status remains 'Pending' until payment is confirmed)
    const investment = new Investment({
      amount,
      investor: req.user._id, // Link the investment to the logged-in user
      campaign: campaign._id,
      status: "Pending",
    });

    // Save the investment to the database
    await investment.save();

    req.user.investmentsMade.push(investment._id);
    req.user.save();

    // Create a payment order with Razorpay
    const options = {
      amount: amount * 100, // Razorpay works in paise, so multiply by 100
      currency: "INR",
      receipt: `receipt_${investment._id}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(201).json({
      investment,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

// Confirm payment after Razorpay payment success
const confirmInvestment = async (req, res) => {
  try {
    const {
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
      investmentId,
    } = req.body;

    // Find the investment
    const investment = await Investment.findById(investmentId);
    if (!investment) {
      return res.status(404).json({ message: "Investment not found" });
    }

    const generatedSignature = crypto
      .createHmac("sha256", keys.key_secret)
      .update(razorpayOrderId + "|" + razorpayPaymentId)
      .digest("hex");

    if (generatedSignature !== razorpaySignature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // Update the investment status to 'Confirmed'
    investment.status = "Confirmed";
    await investment.save();

    // Optionally, update the campaign's currentAmount
    const campaign = await Campaign.findById(investment.campaign);
    campaign.currentAmount += investment.amount;
    campaign.investorsApproached.push({
      investorId: req.user._id,
      amount: investment.amount,
    });

    if (campaign.goalAmount === campaign.currentAmount) {
      campaign.status = "Completed";
    }

    await campaign.save();

    res.status(200).json({ message: "Payment confirmed", investment });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createInvestment,
  confirmInvestment,
};
