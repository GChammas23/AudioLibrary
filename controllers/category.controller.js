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
        .send({ result: result });
    })
    .catch((err) => {
      res.status(500).send({error: err});
    });
};

//GET ALL CATEGORIES
exports.getCategories = (req, res) => {
  Category.find()
    .then((result) => {
      res.status(200).send({categories: result});
    })
    .catch((err) => {
      res.status(500).send({error: err});
    });
};

//GET CATEGORY BY ID
exports.getCategoryById = (req, res) => {
  //Get id from request
  const { _id } = req.body;

  Category.aggregate([{ $match: { _id: mongoose.Types.ObjectId(_id) } }])
    .then((docs) => {
      if (docs.length !== 0) {
        res.status(200).send({category: docs[0]});
      } else {
        res.status(404).send({ message: "No category found!" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({error: err });
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
            result: result,
          });
        })
        .catch((err) => {
          res.status(500).send({
            error: err,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
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
        .send({result: result });
    })
    .catch((err) => {
      res.status(500).send({
        error: err,
      });
    });
};
