//Require services functions and sender middleware
const services = require("./category.services");
const sender = require("../middleware/responseSender");

//ADD CATEGORY API
exports.addCategory = async (req, res, next) => {
  //Create category object to send to service function
  const category = {
    name: req.body.name,
    description: req.body.description,
    createdDate: new Date(),
  };

  try {
    const result = await services.addCategory(category);

    req.result = result;

    sender(req, res);
  } catch (err) {
    throw new Error(err.message);
  }
};

//GET ALL CATEGORIES
exports.getCategories = async (req, res, next) => {
  try {
    const result = await services.getCategories();

    req.result = result;

    sender(req, res);
  } catch (err) {
    throw new Error(err.message);
  }
};

//GET CATEGORY BY ID
exports.getCategoryById = async (req, res, next) => {
  try {
    const result = await services.getCategoryById(req.params.id);

    req.result = result;

    sender(req, res);
  } catch (err) {
    throw new Error(err.message); //Error while fetching category
  }
};

//UPDATE CATEGORY
exports.updateCategoryById = async (req, res, next) => {
  //Create updatedValues object
  const updatedValues = {
    name: req.body.name,
    description: req.body.description,
    updatedDate: new Date(),
  };

  try {
    const result = await services.updateCategoryById(updatedValues, req.params.id);

    req.result = result;

    sender(req, res);
  } catch (err) {
    throw new Error(err.message); //Error while finding the category
  }
};

//DELETE CATEGORY
exports.deleteCategoryById = async (req, res) => {
  try {
    const result = await services.deleteCategoryById(req.params.id);

    req.result = result;

    sender(req, res);
  } catch (err) {
    throw new Error(err.message);
  }
};
