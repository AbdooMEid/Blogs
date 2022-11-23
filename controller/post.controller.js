const postModel = require("../model/postModel");
const ApiError = require("../error/apiError");
const asyncHandler = require("express-async-handler");

exports.createPost = asyncHandler(async (req, res, next) => {
  console.log(req.email, req.role);
  const { title, body } = req.body;
  if (!title || !body) {
    return next(new ApiError("not allowed empty fild", 401));
  }
  const post = await postModel.create({
    title,
    body,
    createdBy: [{ _id: req.id, email: req.email, role: req.role }],
  });
  res.status(201).json({
    success: true,
    data: post,
  });
});
