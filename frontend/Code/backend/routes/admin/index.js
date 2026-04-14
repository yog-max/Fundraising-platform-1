const express = require("express");
const router = express.Router();
const AdminUser = require("./AdminUser");
const AdminCampaign = require("./AdminCampaign");
const AdminInvestment = require("./AdminInvestment");
const AdminDashboard = require("./AdminDashboard");
const AdminActivity = require("./AdminActivity");
const { auth } = require("../../middleware/Auth");
const adminAuthorization = require("../../middleware/AdminAuthorization");

router.use("/users", [auth, adminAuthorization], AdminUser);
router.use("/campaigns", [auth, adminAuthorization], AdminCampaign);
router.use("/investments", [auth, adminAuthorization], AdminInvestment);
router.use("/dashboard", [auth, adminAuthorization], AdminDashboard);
router.use("/activity", [auth, adminAuthorization], AdminActivity);

module.exports = router;
