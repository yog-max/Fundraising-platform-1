const express = require("express");
const { listUsers, makeAdmin } = require("../../controller/admin/AdminUser");
const auth = require("../../middleware/Auth");
const authAdmin = require("../../middleware/AdminAuthorization");

const router = express.Router();

// Route for listing all users (only accessible by admins)
router.get("/", listUsers);

// Route for making a user an admin (only accessible by admins)
router.put("/make-admin/:id", makeAdmin);

module.exports = router;
