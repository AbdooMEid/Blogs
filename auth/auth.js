const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const ApiError = require("../error/apiError");

exports.auth = async (req, res, next) => {
  const token = req.header("token");
  if (!token) return next(new ApiError("token not provided", 401));
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const user = await userModel.findById(decoded.id);
  if (!user) return next(new ApiError("user not found", 404));
  req.user = user;
  next();
};
