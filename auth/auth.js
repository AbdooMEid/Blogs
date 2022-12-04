const jwt = require("jsonwebtoken");
const ApiError = require("../error/apiError");

const auth = (req, res, next) => {
  const token = req.header("token");
  if (token && token != null && token != undefined) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) return next(new ApiError("token not valid!!!!", 401));
      req.email = decode.email;
      req._id = decode.id;
      req.name = decode.name;
      req.role = decode.role;
      next();
    });
  } else {
    return next(new ApiError("your not authenticated", 401));
  }
};

module.exports = auth;
