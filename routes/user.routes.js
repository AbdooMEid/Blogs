const router = require("express").Router();
const { register } = require("../controller/user.controller");
const { registerValidator } = require("../utils/validator/validation");
router.route("/register").post(registerValidator, register);

module.exports = router;
