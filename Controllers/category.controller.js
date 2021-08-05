//Require Category & Track models
const Category = require("../Models/category");
const Track = require("../Models/track");

//ADD CATEGORY API
exports.addCategory = async (req, res) => {
  //Create object from model with given values
  const category = new Category({
    name: req.body.name,
    description: req.body.description,
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

    res.status(200).send({result: result});

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

        res.end();
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
      //Check if category has any tracks related to it
      const tracks = await Track.find({ categoryId: id });

      if (tracks.length > 0) {
        //Tracks found, can't delete
        res.status(403).send();
      } else {
        //No tracks found, now delete category
        const deleteCategory = await Category.deleteOne({ _id: id });

        res.end();
      }
    } else {
      //No category found
      res.status(404).send();
    }
  } catch (err) {
    res.status(500).send({ error: err });
  }
};
