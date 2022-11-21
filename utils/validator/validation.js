const { check } = require("express-validator");
const validator = require("../../middleware/validator");
exports.registerValidator = [
  check("name")
    .notEmpty()
    .withMessage("user name is required")
    .isLength({ min: 4 })
    .withMessage("user name min length is 4 letters")
    .isLength({ max: 50 })
    .withMessage("user name max length is 50 letters"),
  check("email")
    .notEmpty()
    .withMessage("user email is required")
    .isLength({ min: 10 })
    .withMessage("user email min length is 40 letters")
    .isLength({ max: 100 })
    .withMessage("user email max length is 100 letters"),
  check("password")
    .notEmpty()
    .withMessage("user password is required")
    .isLength({ min: 6 })
    .withMessage("user password min length is 6 letters")
    .isLength({ max: 100 })
    .withMessage("user password max length is 100 letters"),
  validator,
];
