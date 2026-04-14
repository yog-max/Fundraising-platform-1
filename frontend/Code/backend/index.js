// Import the necessary modules
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const connectDB = require("./utils/connectDB"); // Import the connectDB function
const dotenv = require("dotenv");

const userRoutes = require("./routes/User");
const campaignRoutes = require("./routes/Campaign");
const investmentRoutes = require("./routes/Investment");
const adminRoutes = require("./routes/admin/index");
const logActivity = require("./middleware/LogActivity");

// Load environment variables from .env file
dotenv.config();

// Create an instance of an Express application
const app = express();

app.use(cookieParser()); // Parse cookies from incoming requests
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(helmet()); // Set various HTTP headers for security

// Use the logActivity middleware for all incoming requests
app.use(logActivity);

corsConfig = {
  origin: ["http://localhost:3000/", "http://localhost:3000"],
  credentials: true,
};

app.use(cors(corsConfig));

app.options(
  ["http://localhost:3000/", "http://localhost:3000"],
  cors(corsConfig)
);

// Connect to the database
connectDB();

// routes
app.use("/api/user", userRoutes);
app.use("/api/campaigns", campaignRoutes);
app.use("/api/investment", investmentRoutes);
app.use("/api/admin", adminRoutes);

// Specify the port number
const PORT = process.env.PORT || 5500;

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
