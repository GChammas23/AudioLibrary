//Set express router for route
const express = require("express");
const router = express.Router();

//Require user services to access methods
const users = require("../controllers/user.controller");

router.post("/signUp", users.createUser);
router.post("/login", users.login);

module.exports = router;