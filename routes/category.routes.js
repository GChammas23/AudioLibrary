//Set express router for route
const express = require("express");
const router = express.Router();

//Require category services to access methods
const categories = require("../controllers/category.controller");

router.post('/addCategory', categories.addCategory);

module.exports = router;