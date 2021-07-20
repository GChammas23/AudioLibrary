//Require Category model and mongoose
const Category = require("../model/category");
const mongoose = require("mongoose");

//ADD CATEGORY API
exports.addCategory = (req, res) => {
  //Extract values from request's body
  const { name } = req.body;
  const { description } = req.body;

  //Create object from model with given values
  const category = new Category({
    name: name,
    description: description,
  });

  //Save category to DB
  category
    .save()
    .then((result) => {
      res
        .status(200)
        .send({ message: "Category successfully added!", result: result });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error occured while trying to save the new category",
        error: err,
      });
    });
};

//GET ALL CATEGORIES
exports.getCategories = (req, res) => {
  Category.find()
    .then((result) => {
      res.status(200).send({
        message: "Categories successfully fetched!",
        categories: result,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error occured while trying to fetch the catgeory",
        error: err,
      });
    });
};

//GET CATEGORY BY ID
exports.getCategoryById = (req, res) => {
  //Get id from request
  const { _id } = req.body;

  Category.aggregate([{ $match: { _id: mongoose.Types.ObjectId(_id) } }])
    .then((docs) => {
      if (docs.length !== 0) {
        res.status(200).send({
          message: "Category successfully fetched!",
          category: docs[0],
        });
      } else {
        res.status(404).send({ message: "No category found!" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error occured while fetching category", error: err });
    });
};

//UPDATE CATEGORY
exports.updateCategoryById = (req, res) => {
  //Get new values from request's body
  const { newName } = req.body;
  const { newDescription } = req.body;
  const { _id } = req.body;

  Category.findById(_id)
    .then((object) => {
      if (newName) object.name = newName;
      if (newDescription) object.description = newDescription;
      object.updatedDate = new Date();

      object
        .save()
        .then((result) => {
          res.status(200).send({
            message: "Category successfully updated!",
            result: result,
          });
        })
        .catch((err) => {
          res.status(500).send({
            message: "Error occured while trying to save the category",
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error occured while trying to find the category",
        error: err,
      });
    });
};

//DELETE CATEGORY
exports.deleteCategoryById = (req, res) => {
  //Get id from request's body
  const { _id } = req.body;

  Category.findByIdAndDelete(_id)
    .then((result) => {
      res
        .status(200)
        .send({ message: "Category successfully deleted!", result: result });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error occured while trying to delete the category",
        error: err,
      });
    });
};
