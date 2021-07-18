//Require Category model
const Category = require("../model/category");

//CATEGORY API's

//ADD CATEGORY
exports.addCategory = (req, res) => {
  const { name } = req.body;
  const { description } = req.body;

  const category = new Category({
    name: name,
    description: description,
  });

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
