// controllers/activityController.js
const Activity = require("../../models/Activity");

// Create a new activity
exports.createActivity = async (req, res) => {
  try {
    const newActivity = new Activity(req.body);
    const savedActivity = await newActivity.save();
    res.status(201).json(savedActivity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Fetch all activities
exports.getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find({})
      .populate("actor")
      .sort({ createdAt: -1 });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
