//Require Category model
const Category = require("../model/category");

//ADD CATEGORY API
exports.addCategory = async (req, res) => {
  //Extract values from request's body
  const { name } = req.body;
  const { description } = req.body;

  //Create object from model with given values
  const category = new Category({
    name: name,
    description: description,
    createdDate: new Date(),
  });

  //Save category to DB
  try {
    const result = await category.save();
    res.status(200).send({ category: result });
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

//GET ALL CATEGORIES
exports.getCategories = async (req, res) => {
  try {
    const result = await Category.find();

    if (result.length > 0) {
      res.status(200).send({ categories: result });
    } else {
      res.status(404).send();
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};

//GET CATEGORY BY ID
exports.getCategoryById = async (req, res) => {
  //Get id from url
  const { id } = req.params;

  try {
    const category = await Category.findById(id);

    if (category) {
      res.status(200).send({ result: category }); //Category found, send it in response
    } else {
      res.status(404).send(); //Category not found, use status 404
    }
  } catch (err) {
    res.status(500).send({ error: err }); //Error while fetching category
  }
};

//UPDATE CATEGORY
exports.updateCategoryById = async (req, res) => {
  //Get id from url
  const { id } = req.params;

  //Find category first
  try {
    const category = await Category.findById(id);

    if (category) {
      //Category found, now update it
      try {
        const update = await Category.updateOne(
          { _id: id },
          {
            $set: {
              name: req.body.newName,
              description: req.body.newDescription,
              updatedDate: new Date(),
            },
          },
          { omitUndefined: true } //Accept only defined values
        );

        //Check if update was successfull
        if (update.nModified > 0) {
          res.end();
        } else {
          res.status(400).send(); //No update done
        }
      } catch (err) {
        res.status(500).send({ error: err }); //Error while updating the category
      }
    } else {
      //Category not found
      res.status(404).send();
    }
  } catch (err) {
    res.status(500).send({ error: err }); //Error while finding the category
  }
};

//DELETE CATEGORY
exports.deleteCategoryById = async (req, res) => {
  //Get id from request's body
  const { id } = req.params;

  try {
    //Find category first
    const category = await Category.findById(id);

    if (category) {
      //Category found, now delete it
      const deleteCategory = await Category.deleteOne({ _id: id });

      if (deleteCategory.deletedCount > 0) {
        res.end();
      } else {
        res.status(500).send();
      }
      
    } else {
      //No category found
      res.status(404).send();
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
