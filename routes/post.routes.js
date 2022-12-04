const router = require("express").Router();
const {
  createPost,
  getPosts,
  getPostAdmin,
  updatePostByAdmin,
  updatePostByUser,
  deletePostByUser,
  deletePostByAdmin,
} = require("../controller/post.controller");
const auth = require("../auth/auth");
const admin = require("../auth/admin");

router.route("/").post(auth, createPost);
router.route("/").get(auth, getPosts);
router.route("/:id").put(auth, updatePostByUser);
router.route("/admin/:id").get(auth, admin, getPostAdmin);
router.route("/admin/:id").put(auth, admin, updatePostByAdmin);
router.route("/:id").delete(auth, deletePostByUser);
router.route("/admin/:id").delete(auth, admin, deletePostByAdmin);

module.exports = router;
