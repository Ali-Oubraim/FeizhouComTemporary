const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isActivate: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Tag", TagSchema);