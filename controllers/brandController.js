const Brand = require("../models/Brand");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

exports.createBrand = async (req, res) => {
  try {
    const {
      brandName,
      brandLogo,
      sector,
      username,
      email,
      password,
      position_in_brand,
      brandSize,
      brandType,
    } = req.body;
    let brand = new Brand({
      brandName,
      brandLogo,
      sector,
      username,
      email,
      password,
      position_in_brand,
      brandSize,
      brandType,
    });

    await brand.save();
    res.status(201).json({ message: "Brand created successfully", brand });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBrands = async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBrandById = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json(brand);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const {
      brandName,
      brandLogo,
      sector,
      username,
      email,
      password,
      position_in_brand,
      brandSize,
      brandType,
    } = req.body;
    let brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    brand.brandName = brandName || brand.brandName;
    brand.brandLogo = brandLogo || brand.brandLogo;
    brand.sector = sector || brand.sector;
    brand.username = username || brand.username;
    brand.email = email || brand.email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      brand.password = await bcrypt.hash(password, salt);
    }
    brand.position_in_brand = position_in_brand || brand.position_in_brand;
    brand.brandSize = brandSize || brand.brandSize;
    brand.brandType = brandType || brand.brandType;

    await brand.save();
    res.status(200).json({ message: "Brand updated successfully", brand });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    let brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    await brand.deleteOne();
    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.softDeleteBrand = async (req, res) => {
  try {
    let brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    brand.isActivate = !brand.isActivate;
    await brand.save();
    res.status(200).json({ message: "Brand Deleted Softlly Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
