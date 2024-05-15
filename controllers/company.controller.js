const Company = require("../models/company.model");
const { validationResult } = require("express-validator");

// Register function
exports.register = async (req, res) => {
  // Validate incoming request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    companyName,
    industry,
    companySize,
    personName,
    phoneNumber,
    positionInCompany,
    password,
    brandLogo,
    brandDesc,
    websiteURL,
  } = req.body;

  try {
    // Check if the company already exists
    let company = await Company.findOne({ companyName });
    if (company) {
      return res.status(400).json({ msg: "Company already exists" });
    }

    // Create a new company
    company = new Company({
      companyName,
      industry,
      companySize,
      personName,
      phoneNumber,
      positionInCompany,
      password,
      brandLogo,
      brandDesc,
      websiteURL,
    });

    // Save the company to the database
    await company.save();

    // Respond with the created company details (excluding password)
    res
      .status(201)
      .json({
        msg: "Company registered successfully",
        company: {
          companyName,
          industry,
          companySize,
          personName,
          phoneNumber,
          positionInCompany,
          brandLogo,
          brandDesc,
          websiteURL,
        },
      });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};
