const router = require("express").Router();
const { createPost } = require("../controller/post.controller");
const auth = require("../auth/auth");
const admin = require("../auth/admin");

router.route("/").post(auth, createPost);

module.exports = router;
