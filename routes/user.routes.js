const router = require("express").Router();
const { register, login } = require("../controller/user.controller");
const {
  registerValidator,
  loginValidator,
} = require("../utils/validator/validation");
router.route("/register").post(registerValidator, register);
router.route("/login").post(loginValidator, login);

module.exports = router;
