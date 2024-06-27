const Influencer = require("../models/Influencer");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

exports.createInfluencer = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log("=========================Influencer Controller=======================");
  console.log(req.body);

  const {
    first_name,
    last_name,
    username,
    email,
    password,
    avatar,
    country,
    city,
    bio,
    tags,
    social_medias,
  } = req.body;

  try {
    let influencer = new Influencer({
      first_name,
      last_name,
      username,
      email,
      password,
      avatar,
      country,
      city,
      bio,
      tags,
      social_medias,
    });

    await influencer.save();
    res.status(201).json(influencer);
  } catch (err) {
    res.status(500).json(`Server error ${err.message}`);
  }
};

exports.getInfluencers = async (req, res) => {
  try {
    const influencers = await Influencer.find().populate(
      "social_medias.socialMediaId"
    ).populate("tags");
    res.json(influencers);
  } catch (err) {
    res.status(500).json({Server_Error: err.message});
  }
};

exports.getInfluencerById = async (req, res) => {
  try {
    const influencer = await Influencer.findById(req.params.id);
    if (!influencer) {
      return res.status(404).json({ msg: "Influencer not found" });
    }
    res.json(influencer);
  } catch (err) {
    res.status(500).send("Server error");
  }
};

exports.updateInfluencer = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Find the influencer by ID and update with new data
    const influencer = await Influencer.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!influencer) {
      return res.status(404).json({ msg: "Influencer not found" });
    }

    res.json(influencer);
  } catch (err) {
    res.status(500).json({ Server_Error: err.message });
  }
};

// exports.updateInfluencer = async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const {
//     first_name,
//     last_name,
//     username,
//     email,
//     password,
//     isActivate,
//     avatar,
//     country,
//     city,
//     bio,
//     social_medias,
//   } = req.body;

//   const influencerFields = {
//     first_name,
//     last_name,
//     username,
//     email,
//     isActivate,
//     avatar,
//     country,
//     city,
//     bio,
//     social_medias,
//   };

//   try {
//     let influencer = await Influencer.findById(req.params.id);

//     if (!influencer) {
//       return res.status(404).json({ msg: "Influencer not found" });
//     }

//     if (password) {
//       influencerFields.password = await bcrypt.hash(password, 10);
//     }

//     influencer = await Influencer.findByIdAndUpdate(
//       req.params.id,
//       { $set: influencerFields },
//       { new: true }
//     );

//     res.json(influencer);
//   } catch (err) {
//     res.status(500).send("Server error");
//   }
// };

exports.deleteInfluencer = async (req, res) => {
  try {
    let influencer = await Influencer.findById(req.params.id);

    if (!influencer) {
      return res.status(404).json({ msg: "Influencer not found" });
    }

    await Influencer.findByIdAndRemove(req.params.id);

    res.json({ msg: "Influencer removed" });
  } catch (err) {
    res.status(500).send("Server error");
  }
};
