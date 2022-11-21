const ApiError = require("../error/apiError");

const admin = (req, res, next) => {
  if (!req.role) {
    return next(new ApiError("you are not admin user....", 403));
  }
  next();
};

module.exports = admin;
