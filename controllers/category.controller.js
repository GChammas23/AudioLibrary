//Require Category model
const Category = require("../model/category");

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
      console.log(err);
    });
};
