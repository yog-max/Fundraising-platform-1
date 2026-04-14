const express = require("express");
const {
  createInvestment,
  confirmInvestment,
} = require("../controller/Investment");
const { auth } = require("../middleware/Auth");

const router = express.Router();

// Create a new investment
router.post("/create", auth, createInvestment);

// Confirm payment and update investment status
router.post("/confirm", auth, confirmInvestment);

module.exports = router;
