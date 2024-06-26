const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
      enum: ["admin", "owner", "developer"],
      required: false,
    },
    position: {
      type: String,
      default: null,
      required: false,
    },
    phoneNumber: {
      type: String,
      default: null,
      required: false,
    },
    permissions: [
      {
        type: String,
        required: false,
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
      required: false,
    },
    avatar: {
      type: String,
      default: null,
      required: false,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", UserSchema);
