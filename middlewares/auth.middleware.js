const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = function (req, res, next) {
  let token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  
  token = token.split(" ")[1];

  try {
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.company = decoded.company;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
