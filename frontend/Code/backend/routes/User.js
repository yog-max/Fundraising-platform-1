const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
} = require("../controller/User"); // Adjust the path to your controller
const { auth } = require("../middleware/Auth");

// User registration route
router.post("/register", registerUser);

// User login route
router.post("/login", loginUser);

// User logout route
router.post("/logout", auth, logoutUser);

// User registration route
router.get("/check-auth", auth, getUser);

// User update route
router.put("/update", auth, updateUser);


module.exports = router;
