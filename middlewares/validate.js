const { check } = require("express-validator");

// exports.companyValidationRules = () => {
//   return [
//     check("companyName")
//       .not()
//       .isEmpty()
//       .withMessage("Company name is required"),
//     check("industry").not().isEmpty().withMessage("Industry is required"),
//     check("companySize")
//       .isIn(["Small", "Medium", "Large"])
//       .withMessage("Company size must be Small, Medium, or Large"),
//     check("personName").not().isEmpty().withMessage("Person name is required"),
//     check("phoneNumber")
//       .not()
//       .isEmpty()
//       .withMessage("Phone number is required"),
//     check("positionInCompany")
//       .not()
//       .isEmpty()
//       .withMessage("Position in company is required"),
//     check("password")
//       .isLength({ min: 10 })
//       .withMessage("Password must be at least 10 characters long"),
//     check("email")
//       .isEmail()
//       .withMessage("Email must be Valid"),
//     check("websiteURL")
//       .optional()
//       .isURL()
//       .withMessage("Website URL must be valid"),
//   ];
// };

exports.registerValidationRules = () => {
  return [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").isLength({min:8,max:50},"Password most be at least 8 chars").exists(),
    check("role", "Please include a valid role")
      .isIn(["admin", "owner"])
      .optional(),
    check("name", "Name is required").exists(),
  ];
};

exports.loginValidationRules = () => {
  return [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ];
};
