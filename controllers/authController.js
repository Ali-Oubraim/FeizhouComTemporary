const { validationResult } = require("express-validator");
const Admin = require("../models/Admin.js");
const bcrypt = require("bcrypt");
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
    // Check if the admin already exists
    let admin = await Admin.findOne({ name });
    if (admin) {
      return res.status(400).json({ msg: "Admin already exists" });
    }

    // Create a new admin
    admin = new Admin({
      name,
      email,
      password,
      role,
    });

    // Save the admin to the database
    await admin.save();

    // Respond with the created admin details (excluding password)
    res.status(201).json({
      msg: "admin registered successfully",
      admin: {
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
    let admin = await Admin.findOne({ email: email.toLowerCase() });
    // console.log(admin);
    if (!admin) {
      return res.status(400).json({ msg: "Invalid Email" });
    }
    // console.log(await admin.comparePassword(password));

    if (!(await admin.comparePassword(password))) {
      return res.status(400).json({ msg: "Invalid Password" });
    }

    const payload = {
      admin: {
        id: admin._id,
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
