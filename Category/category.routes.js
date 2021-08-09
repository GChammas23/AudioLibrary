//Set express router for route and express-validation for validation
const express = require("express");
const router = express.Router();
const { validate } = require("express-validation");

//Require category services to access methods
const categories = require("./category.controller");

//Require validation schema
const validation = require("./category.validation");

router.post(
  "/",
  validate(validation.categorySchema, {keyByField: true}, {}),
  categories.addCategory
);
router.get("/", categories.getCategories);
router.get("/:id", categories.getCategoryById);
router.put("/:id", categories.updateCategoryById);
router.delete("/:id", categories.deleteCategoryById);

module.exports = router;