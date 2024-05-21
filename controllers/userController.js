const { validationResult } = require("express-validator");
const User = require("../models/User");

/**
 * Crud Operations for User
 */
exports.updateProfile = async (req, res) => {
  const { name, email, role } = req.body;
  try {
    // console.log(req.user);
    const { id } = req.user;
    
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updatePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.user;
    let user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    // console.log(await user.comparePassword(oldPassword));

    if (!(await user.comparePassword(oldPassword))) {
      return res.status(400).json({ msg: "Invalid old Password" });
    }

    user.password = newPassword;

    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { isActive: !user.isActive },
      {
        new: true,
      }
    );

    res.json({ msg: "User removed", updatedUser: updatedUser });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
