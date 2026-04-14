const User = require("../../models/User");

// Controller to list all users
const listUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Exclude passwords from the response
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// Controller to make a user an admin
const makeAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = "admin"; // Update role to admin
    await user.save();

    res.status(200).json({ message: `${user.name} is now an admin.` });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error making user an admin", error: error.message });
  }
};

module.exports = {
  listUsers,
  makeAdmin,
};
