const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust the path according to your folder structure

// Protect routes middleware
const auth = async (req, res, next) => {
  let token;

  // Check if token exists in cookies
  if (req.cookies && req.cookies.token) {
    try {
      // Extract the token from cookies
      token = req.cookies.token;

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Fetch the user associated with the token
      req.user = await User.findById(decoded._id)
        .select("-password")
        .populate("campaignsCreated") // Populate campaignsCreated field
        .populate("investmentsMade"); // Populate investmentsMade field

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, kindly login." });
  }
};

module.exports = { auth };
