//Require services functions
const services = require("./category.services");

//ADD CATEGORY API
exports.addCategory = async (req, res) => {
  try {
    const result = await services.addCategory(req);

    if (result) {
      res.status(200).send({ result: result });
    } else {
      res.status(400).send();
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

//GET ALL CATEGORIES
exports.getCategories = async (req, res) => {
  try {
    const result = await services.getCategories();
    res.status(200).send({ result: result });
  } catch (err) {
    throw new Error(err.message);
  }
};

//GET CATEGORY BY ID
exports.getCategoryById = async (req, res) => {
  try {
    const result = await services.getCategoryById(req);

    if (result) {
      res.status(200).send({ result: result });
    } else {
      res.status(404).send();
    }
  } catch (err) {
    throw new Error(err.message); //Error while fetching category
  }
};

//UPDATE CATEGORY
exports.updateCategoryById = async (req, res) => {
  //Find category first
  try {
    const result = await services.updateCategoryById(req);

    if (result == 200) {
      res.end();
    } else {
      res.status(result).send();
    }
  } catch (err) {
    throw new Error(err.message); //Error while finding the category
  }
};

//DELETE CATEGORY
exports.deleteCategoryById = async (req, res) => {
  try {
    const result = await services.deleteCategoryById(req);

    if (result == 200) {
      res.end();
    } else {
      res.status(result).send();
    }
  } catch (err) {
    throw new Error(err.message);
  }
};
