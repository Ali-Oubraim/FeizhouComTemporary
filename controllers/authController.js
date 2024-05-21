const { validationResult } = require("express-validator");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  // Validate incoming request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({ msg: "Invalid Email" });
    }
    
    if (!user.isActive) {
      return res.status(400).json({ msg: "Your Account Has Been Suspend !!" });
    }

    if (!(await user.comparePassword(password))) {
      return res.status(400).json({ msg: "Invalid Password" });
    }

    const payload = {
      user: {
        id: user._id,
        role: user.role
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
