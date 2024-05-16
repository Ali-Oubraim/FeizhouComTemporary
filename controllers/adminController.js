const Admin = require("../models/Admin");

/**
 * Crud Operations for Admin
 */
exports.updateProfile = async (req, res) => {
  const { name, email, role } = req.body;
  try {
    let admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ msg: "Admin not found" });
    }

    admin.name = name || admin.name;
    admin.email = email || admin.email;
    admin.role = role || admin.role;

    await admin.save();
    res.json(admin);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    let user = await Admin.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(
      { _id: req.params.id },
      { isActive: !user.isActive },{
        new: true,
      }
    );
    
    res.json({ msg: "User removed", updatedAdmin : updatedAdmin});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Admin.find().select("-password");
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
