const express = require("express");
const { getInvestments } = require("../../controller/admin/AdminInvestment"); // Adjust the path to your controller

const router = express.Router();

router.get("/", getInvestments);

module.exports = router;
