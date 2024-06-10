const mongoose = require("mongoose");
const { Schema } = mongoose;

// Assuming SocialMediaModel is already defined elsewhere in your project
const SocialMediaSchema = require("./path/to/SocialMediaModel");

const InfluencerSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
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
    isActivate: {
      type: Boolean,
      default: true,
    },
    avatar: {
      type: String,
    },
    bio: {
      type: String,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    // New social_medias attribute
    social_medias: [
      {
        socialMediaId: {
          type: Schema.Types.ObjectId,
          refPath: "onModel",
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field to dynamically set the ref based on the model name
InfluencerSchema.virtual("onModel").get(function () {
  return this.social_medias[0] ? this.social_medias[0].socialMediaId : null;
});

module.exports = mongoose.model("Influencer", InfluencerSchema);
