// routes/activityRoutes.js
const express = require("express");
const router = express.Router();
const activityController = require("../../controller/admin/AdminActivity");

// Route to create an activity
router.post("/", activityController.createActivity);

// Route to get all activities
router.get("/", activityController.getAllActivities);

module.exports = router;
