const Category = require("../models/Category");

// Create a new category
exports.createTag = async (req, res) => {
  try {
    let category = await Category.findOne({ name: req.body.name });
    if (category) {
      return res.status(400).json({ msg: "Category already exists" });
    }
    category = new Category(req.body);
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
      tags = await Category.find();
    } else {
      tags = await Category.find({
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
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a category by ID
exports.updateTag = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
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
    let category = await Category.findOne({ _id: id });
    console.log(category);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    category = await Category.findByIdAndUpdate(
      { _id: id },
      { isActivate: !category.isActivate },
      { new: true }
    );

    res.status(200).json({ message: "Category deleted successfully", category });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
