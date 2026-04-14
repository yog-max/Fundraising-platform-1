const Activity = require("../models/Activity");

// Function to create an activity
const createActivity = async (actorId, action) => {
  try {
    // Create a new activity document
    const activity = new Activity({
      actor: actorId, // Reference to the User model
      action: action, // Description of the action
    });
    // Save the activity to the database
    console.log(activity);
    await activity.save();
    return activity;
  } catch (error) {
    console.error("Error creating activity:", error);
  }
};

module.exports = createActivity;
