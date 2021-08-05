//Set express router for route
const express = require("express");
const router = express.Router();

//Require user services to access methods
const users = require("../controllers/user.controller");

router.post("/auth/signUp", users.createUser);
router.post("/auth/login", users.login);

module.exports = router;