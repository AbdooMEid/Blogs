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
const { auth } = require("../auth/auth");
const { AllwoedTo } = require("../auth/admin");

router.route("/").post(auth, AllwoedTo("user"), createPost);
router.route("/").get(auth, AllwoedTo("user"), getPosts);
router.route("/:id").put(auth, updatePostByUser);
router.route("/admin/:id").get(auth, AllwoedTo("admin"), getPostAdmin);
router.route("/admin/:id").put(auth, AllwoedTo("admin"), updatePostByAdmin);
router.route("/:id").delete(auth, AllwoedTo("user"), deletePostByUser);
router.route("/admin/:id").delete(auth, AllwoedTo("admin"), deletePostByAdmin);

module.exports = router;
