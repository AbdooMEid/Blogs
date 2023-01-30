const ApiError = require("../error/apiError");
const { asyncHandller } = require("../utils/asyncHandler");

exports.AllwoedTo = (...roles) => {
  return asyncHandller(async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError("you are not authroized to access this route ", 401)
      );
    }
    next();
  });
};
