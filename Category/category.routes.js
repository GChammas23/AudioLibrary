//Set express router for route
const express = require("express");
const router = express.Router();

//Require category services to access methods
const categories = require("./category.controller");

router.post('/', categories.addCategory);
router.get('/', categories.getCategories);
router.get('/:id', categories.getCategoryById);
router.put('/:id', categories.updateCategoryById);
router.delete('/:id', categories.deleteCategoryById);

module.exports = router;