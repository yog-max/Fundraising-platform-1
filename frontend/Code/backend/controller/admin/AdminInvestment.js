const Investment = require("../../models/Investment"); // Adjust the path to your Campaign model

const getInvestments = async (req, res) => {
  try {
    const investments = await Investment.find({})
      .populate("investor")
      .sort({ createdAt: -1 }); 
    res.status(201).json(investments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  getInvestments,
};
