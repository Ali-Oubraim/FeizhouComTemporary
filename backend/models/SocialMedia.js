const mongoose = require("mongoose");

const SocialMediaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: null,
  },
  isActivate: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("SocialMedia", SocialMediaSchema);
