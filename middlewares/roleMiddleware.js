module.exports = (allowedRoles) => {
  return async (req, res, next) => {
    // check if passed arg is a string or array of roles :
    if (!Array.isArray(allowedRoles)) {
      allowedRoles = [allowedRoles];
    }
    // check if the user role is in the allowed roles array :
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(401).json({
        // error: "you are not allowed to access this action",
        error: `Only ${allowedRoles} allowed to access this action`,
      });
    }
    next();
  };
};
//
