//Set express router for route
const express = require("express");
const router = express.Router();

//Require category services to access methods
const categories = require("../controllers/category.controller");

router.post('/addCategory', categories.addCategory);
router.get('/getCategories', categories.getCategories);
router.post('/getCategoryById/:id', categories.getCategoryById);
router.put('/updateCategoryById/:id', categories.updateCategoryById);
router.delete('/deleteCategoryById/:id', categories.deleteCategoryById);

module.exports = router;