// const SocialMedia = require('../models/SocialMedia');
const SocialMedia = require("../models/socialMedia");

// Create a new category
exports.createTag = async (req, res) => {
  try {
    let category = await SocialMedia.findOne({ name: req.body.name });
    if (category) {
      return res.status(400).json({ msg: "SocialMedia already exists" });
    }
    category = new SocialMedia(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all tags
exports.getAllTags = async (req, res) => {
  try {
    let tags;
    if (req.query.all == "true") {
      tags = await SocialMedia.find();
    } else {
      tags = await SocialMedia.find({
        isActivate: true,
      });
    }
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a category by ID
exports.getTagById = async (req, res) => {
  try {
    const category = await SocialMedia.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "SocialMedia not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a category by ID
exports.updateTag = async (req, res) => {
  try {
    const category = await SocialMedia.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return res.status(404).json({ error: "SocialMedia not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a category by ID
exports.deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    let category = await SocialMedia.findOne({ _id: id });
    console.log(category);
    if (!category) {
      return res.status(404).json({ error: "SocialMedia not found" });
    }

    category = await SocialMedia.findByIdAndUpdate(
      { _id: id },
      { isActivate: !category.isActivate },
      { new: true }
    );

    res.status(200).json({ message: "SocialMedia deleted successfully", category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
