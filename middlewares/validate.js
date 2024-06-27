const { check, validationResult } = require("express-validator");


exports.brandValidationRules = () => {
  return [
    check("brandName").not().isEmpty().withMessage("Brand name is required"),
    check("brandLogo").not().isEmpty().withMessage("Brand logo is required"),
    check("sector").not().isEmpty().withMessage("Sector is required"),
    check("username").not().isEmpty().withMessage("Username is required"),
    check("email").isEmail().withMessage("Email is invalid"),
    check("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    check("position_in_brand")
      .not()
      .isEmpty()
      .withMessage("Position in brand is required"),
    check("brandSize")
      .isIn(["small", "medium", "large"])
      .withMessage("Brand size is invalid"),
    check("brandType")
      .isIn(["coparatif", "company", "assiciation"])
      .withMessage("Brand type is invalid"),
  ];
};

exports.updateBrandValidationRules = () => {
  return [
    check("brandName")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Brand name is required"),
    check("brandLogo")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Brand logo is required"),
    check("sector")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Sector is required"),
    check("username")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Username is required"),
    check("email").optional().isEmail().withMessage("Email is invalid"),
    check("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    check("position_in_brand")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Position in brand is required"),
    check("brandSize")
      .optional()
      .isIn(["small", "medium", "large"])
      .withMessage("Brand size is invalid"),
    check("brandType")
      .optional()
      .isIn(["coparatif", "company", "assiciation"])
      .withMessage("Brand type is invalid"),
  ];
};

exports.registerValidationRules = () => {
  return [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required")
      .isLength({ min: 8, max: 50 }, "Password most be at least 8 chars")
      .exists(),
    check("role", "Please include a valid role")
      .isIn(["admin", "owner"])
      .optional(),
    check("name", "Name is required").exists(),
  ];
};

exports.loginValidationRules = () => {
  return [
    check("email").isEmail().withMessage("Please include a valid email"),
    check("password").exists().withMessage("Password is required"),
  ];
};
exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
