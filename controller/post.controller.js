const postModel = require("../model/postModel");
const { asyncHandller } = require("../utils/asyncHandler");
const ApiError = require("../error/apiError");

exports.createPost = asyncHandller(async (req, res, next) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return next(new ApiError("not allowed empty fild", 401));
  }
  const post = await postModel.insertMany({
    userId: req.user._id,
    title,
    body,
    createdBy: [{ email: req.user.email, role: req.user.role }],
  });
  res.status(201).json({
    success: true,
    data: post,
  });
});

exports.getPosts = asyncHandller(async (req, res, next) => {
  const posts = await postModel.findOne({ userId: req.user._id });
  if (posts === null || posts === undefined) {
    return next(new ApiError("notFound", 404));
  }
  if (posts.status === "PENDING") {
    return res.status(401).json({
      success: false,
      data: "the post is pending becuse accebt admin",
    });
  }
  if (posts.status === "REJECTED") {
    return res.status(401).json({
      success: false,
      data: "the post is REJECTED becuse not accebt admin",
    });
  }
  res.status(200).json({
    success: true,
    data: posts,
  });
});

exports.getPostAdmin = asyncHandller(async (req, res, next) => {
  const { id } = req.params;
  const posts = await postModel.findOne({ _id: id });
  if (posts === null || posts === undefined) {
    return next(new ApiError("notFound", 404));
  }
  res.status(200).json({ success: true, data: posts });
});

exports.updatePostByUser = asyncHandller(async (req, res, next) => {
  const { title, body } = req.body;
  const { id } = req.params;
  const post = await postModel.findOne({ _id: id });
  if (!post) {
    return next(new ApiError("not Found", 404));
  }
  await postModel.findByIdAndUpdate(
    { _id: id },
    {
      title,
      body,
    },
    { new: true }
  );
  res.status(200).json({
    success: true,
    data: "Updated",
  });
});

exports.updatePostByAdmin = asyncHandller(async (req, res, next) => {
  const { status } = req.body;
  const { id } = req.params;
  const post = await postModel.findOne({ _id: id });
  if (!post) {
    return next(new ApiError("not Found", 404));
  }
  await postModel.findByIdAndUpdate(
    { _id: id },
    {
      status,
    },
    { new: true }
  );
  res.status(200).json({
    success: true,
    data: "Updated",
  });
});

exports.deletePostByUser = asyncHandller(async (req, res, next) => {
  const { id } = req.params;
  const post = await postModel.findOne({ _id: id });
  if (!post) {
    return next(new ApiError("Not Found", 404));
  }
  await postModel.findByIdAndDelete({ _id: id }, { new: true });
  res.status(200).json({ success: true, data: "Deleted" });
});

exports.deletePostByAdmin = asyncHandller(async (req, res, next) => {
  const { id } = req.params;
  const post = await postModel.findOne({ _id: id });
  if (!post) {
    return next(new ApiError("not Found", 404));
  } else if (post.status === "REJECTED") {
    await postModel.findByIdAndDelete({ _id: id }, { new: true });
    res
      .status(200)
      .json({ success: true, data: "Deleted By Admin becuse Rejected Post" });
  } else {
    return next(new ApiError("the post is Aproved no must deleted"));
  }
});
