const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

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
    country: {
      type: String,
    },
    city: {
      type: String,
    },
    bio: {
      type: String,
    },
    tags: [
      {
        type: Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    social_medias: [
      {
        socialMediaId: {
          type: Schema.Types.ObjectId,
          ref: "SocialMedia",
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

InfluencerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

InfluencerSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Pre-save hook to handle new social media entries
InfluencerSchema.pre("save", function (next) {
  this.social_medias = this.social_medias.filter((sm) => sm.url); // Ensure URLs are valid
  next();
});

// Pre-update hook to handle updates to the social media array
InfluencerSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.$set && update.$set.social_medias) {
    update.$set.social_medias = update.$set.social_medias.filter(
      (sm) => sm.url
    ); // Ensure URLs are valid
  }
  next();
});

// Pre-update hook to handle updates to the tags array
InfluencerSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.$set && update.$set.tags) {
    // Add any logic here to update the tags array if necessary
    // For example, you might want to remove duplicates
    update.$set.tags = Array.from(new Set(update.$set.tags));
  }
  next();
});

module.exports = mongoose.model("Influencer", InfluencerSchema);
