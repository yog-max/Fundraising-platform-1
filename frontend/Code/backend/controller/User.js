const User = require("../models/User"); // Adjust the path to the User model
const bcrypt = require("bcryptjs");

// User signup
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const user = await User.create({
      name,
      email,
      password,
      role: "user",
    });

    // Generate JWT token
    const token = user.generateToken();

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only in production
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Invalid user data" });
  }
};

// User login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    // Generate JWT token
    const token = user.generateToken();

    // Set token in HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only in production
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

// User logout
const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // Expire the cookie immediately
  });

  res.json({ message: "Logged out successfully" });
};

// User logout
const getUser = (req, res) => {
  res.json(req.user);
};

// Controller to update user profile
const updateUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Get the authenticated user ID from req.user._id
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the fields only if they are provided in the request
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password; // No need to manually hash

    // Save the updated user information (password will be hashed if modified)
    const updatedUser = await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user: {
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
  updateUser,
};
