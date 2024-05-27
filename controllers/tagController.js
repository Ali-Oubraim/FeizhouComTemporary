const Tag = require("../models/Tag");

// Create a new tag
exports.createTag = async (req, res) => {
  try {
    let tag = await Tag.findOne({ name: req.body.name });
    if (tag) {
      return res.status(400).json({ msg: "Tag already exists" });
    }
    tag = new Tag(req.body);
    await tag.save();
    res.status(201).json(tag);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all tags
exports.getAllTags = async (req, res) => {
  try {
    let tags;
    if (req.query.all=="true") {
      tags = await Tag.find();
    } else {
      tags = await Tag.find({
        isActivate: true,
      });
    }
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a tag by ID
exports.getTagById = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a tag by ID
exports.updateTag = async (req, res) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a tag by ID
exports.deleteTag = async (req, res) => {
  try {
    const { id } = req.params;
    let tag = await Tag.findOne({ _id: id });
    console.log(tag);
    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    tag = await Tag.findByIdAndUpdate(
      { _id: id },
      { isActivate: !tag.isActivate },
      { new: true }
    );

    res.status(200).json({ message: "Tag deleted successfully", tag });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
