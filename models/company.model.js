const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the schema
const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
  },  
  industry: {
    type: String,
    required: true,
    trim: true,
  },
  companySize: {
    type: String,
    required: true,
    enum: ["Small", "Medium", "Large"], // Optional: Enum for predefined size categories
  },
  personName: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  positionInCompany: {
    type: String,
    required: true,
    trim: true,
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
  brandLogo: {
    type: String,
    required: false, // Assuming logo is optional
  },
  brandDesc: {
    type: String,
    required: false, // Assuming description is optional
    trim: true,
  },
  websiteURL: {
    type: String,
    required: false, // Assuming website URL is optional
    trim: true,
  },
});

// Pre-save hook to hash the password
companySchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Create the model
const Company = mongoose.model("Company", companySchema);

module.exports = Company;
