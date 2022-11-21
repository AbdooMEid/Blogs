const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const ApiError = require("../error/apiError");
const asyncHandler = require("express-async-handler");

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    return next(new ApiError("user email is already  exists", 401));
  }
  const saltRound = 10;
  const salt = await bcrypt.genSalt(saltRound);
  const passwordHash = await bcrypt.hash(password, salt);

  const register = await userModel.insertMany({
    name,
    email,
    password: passwordHash,
    role,
  });
  return res.status(201).json({
    success: true,
    message: register,
  });
});
