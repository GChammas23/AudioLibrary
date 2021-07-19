//Set express router for route
const express = require("express");
const router = express.Router();

//Require category services to access methods
const categories = require("../controllers/category.controller");

router.post('/addCategory', categories.addCategory);
router.get('/getCategories', categories.getCategories);
router.post('/getCategoryById', categories.getCategoryById);
router.put('/updateCategoryById', categories.updateCategoryById);
router.delete('/deleteCategoryById', categories.deleteCategoryById);

module.exports = router;