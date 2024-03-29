const bcrypt = require("bcrypt");
const userModel = require("../model/userModel");
const ApiError = require("../error/apiError");
const { asyncHandller } = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");

exports.register = asyncHandller(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (user) {
    return next(new ApiError("user email is already  exists", 401));
  }
  const saltRound = Number(process.env.SALT_ROUND);
  const salt = await bcrypt.genSalt(saltRound);
  const passwordHash = await bcrypt.hash(password, salt);

  const register = await userModel.insertMany({
    name,
    email,
    password: passwordHash,
  });
  return res.status(201).json({
    success: true,
    data: register,
  });
});

exports.login = asyncHandller(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(new ApiError("user email is not exists", 401));
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(new ApiError("password or email is correct....."));
  }
  const token = jwt.sign(
    { id: user._id, email: user.email, name: user.name, role: user.role },
    process.env.JWT_SECRET
  );
  if (user.role === "admin") {
    return res
      .status(200)
      .header("token", token)
      .json({ success: true, data: "login success admin" });
  }
  res
    .status(200)
    .header("token", token)
    .json({ success: true, data: "login success" });
});
