const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    required: true,
    default: "user",
  },
  campaignsCreated: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
    },
  ],
  investmentsMade: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Investment",
    },
  ],
  token: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Password hashing middleware
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password verification
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Method to generate a token
userSchema.methods.generateToken = function () {
  const token = jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: "30d" } // Token valid for 30 days
  );
  this.token = token;
  return token;
};

const User = mongoose.model("User", userSchema);
module.exports = User;
