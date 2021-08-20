//Set express router for route
const express = require("express");
const router = express.Router();
const { validate } = require("express-validation");

//Require user services to access methods
const users = require("./user.controller");

const validation = require("./user.validation");
const checkToken = require("../middleware/checkToken");

router.post(
  "/signUp",
  validate(validation.signUpSchema, { keyByField: true }, {}),
  users.createUser
);
router.post(
  "/login",
  validate(validation.loginSchema, { keyByField: true }, {}),
  users.login
);

router.post("/sendResetMail", users.sendResetMail);

router.put(
  "/resetPass",
  validate(validation.resetPassSchema, { keyByField: true }, {}),
  checkToken,
  users.resetPass
);

module.exports = router;
