// middleware/logActivity.js
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import your User model
const createActivity = require("../utils/activity"); // Adjust the path as needed
const Activity = require("../models/Activity");

const logActivity = async (req, res, next) => {
  try {
    // Get the token from cookies
    const token = req.cookies.token;
    if (!token) {
      return next(); // Continue to next middleware/route if no token
    }

    // Verify the token and extract user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure to set your JWT_SECRET
    const userId = decoded._id; // Adjust based on your token payload

    // Fetch the user (actor)
    const user = await User.findById(userId);
    if (!user) {
      return next(); // Continue to next middleware/route if user not found
    }

    // Specify the action based on the request method and route
    const action = `${req.method} request to ${req.originalUrl}`;

    const activity = new Activity({
      actor: user._id, // Reference to the User model
      action: action, // Description of the action
    });

    // Save the activity to the database
    await activity.save();

    // Call the next middleware/route handler
    next();
  } catch (error) {
    console.error("Error logging activity:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = logActivity;
