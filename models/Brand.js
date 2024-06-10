const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const BrandSchema = new mongoose.Schema({
  brandName: {
    type: String,
    required: [true, "Brand name is required"],
  },
  brandLogo: {
    type: String,
    required: [false, "Brand logo is required"],
  },
  sector: {
    type: String,
    required: [true, "Sector is required"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  position_in_brand: {
    type: String,
    required: [true, "Position in brand is required"],
  },
  brandSize: {
    type: String,
    enum: ["small", "medium", "large"],
    required: [true, "Brand size is required"],
  },
  brandType: {
    type: String,
    enum: ["coparatif", "company", "assiciation"],
    required: [true, "Brand type is required"],
  },
  isActivate: {
    type: Boolean,
    default: true,
    required: false,
  },
});

// Pre-save hook to hash the password
BrandSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare password
BrandSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("Brand", BrandSchema);
