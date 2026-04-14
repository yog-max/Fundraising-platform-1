// Middleware to authorize user based on admin status
const adminAuthorization = (req, res, next) => {
  // Check if the user is an admin
  if (req.user && req.user.role === "admin") {
    // If the user is an admin, proceed to the next middleware or route handler
    return next();
  } else {
    // If the user is not an admin, return a 403 Forbidden response
    return res.status(403).json({ error: "Forbidden: Admins only" });
  }
};

module.exports = adminAuthorization; // Export the middleware
