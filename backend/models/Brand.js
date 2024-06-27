const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const BrandSchema = new mongoose.Schema({
  brandName: {
    type: String,
    required: [true, "Brand name is required"],
  },
  brandLogo: {
    type: String,
    required: false,
  },
  sector: {
    type: String,
    required: false,
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
    required: false,
  },
  brandSize: {
    type: String,
    enum: ["Petite(TRE)", "Moyenne(FME/ETI)", "Grande(GE)"],
    required: false,
  },
  brandType: {
    type: String,
    enum: ["Coopérative", "Entreprise", "Association", "Auto-entrepreneur"],
    required: false,
  },
  ICE: {
    type: Number,
    default: null,
    required: false,
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
