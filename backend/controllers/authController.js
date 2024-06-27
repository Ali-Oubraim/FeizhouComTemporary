const { validationResult } = require("express-validator");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
require("dotenv").config();

exports.register = async (req, res) => {
  // Validate incoming request

  const { name, email, password, role } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ name });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create a new user
    user = new User({
      name,
      email,
      password,
      role,
    });

    // Save the user to the database
    await user.save();

    // Respond with the created user details (excluding password)
    res.status(201).json({
      msg: "user registered successfully",
      user: {
        name,
        email,
        role,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email.toLowerCase() });

    //  check if user is not existing :
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (!(await user.comparePassword(password))) {
      return res.status(400).json({ msg: "Invalid Password" });
    }

    if (!user.isActive) {
      return res.status(400).json({ msg: "Your Account Has Been Suspend !!" });
    }

    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.json({
      statusCode: 200,
      msg: "User logged in successfully",
      token: token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Create logout function by expiring token :

exports.logout = async (req, res) => {
  try {
    // Set token's expiration date to 1970 :
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), // Set the cookie expiration to a past date to delete it
    });
   res.status(200).json({ msg: "Logged out" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

