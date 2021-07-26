//Set express router for route
const express = require("express");
const router = express.Router();

//Require category services to access methods
const categories = require("../controllers/category.controller");

router.post('/category', categories.addCategory);
router.get('/category', categories.getCategories);
router.get('/category/:id', categories.getCategoryById);
router.put('/category/:id', categories.updateCategoryById);
router.delete('/category/:id', categories.deleteCategoryById);

module.exports = router;