const Category = require("../Models/category");

exports.addCategoryService = async (req) => {
  //Create object from model with given values
  const category = new Category({
    name: req.body.name,
    description: req.body.description,
    createdDate: new Date(),
  });

  //Save category to DB
  const result = await category.save();
  return result._id;
};

exports.getCategoriesService = async () => {
  const result = await Category.find();

  return result;
};

exports.getCategoryByIdService = async (req) => {
  const category = await Category.findById(req.params.id);

  return category;
};

exports.updateCategoryService = async (req) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    //Category found, now update it
    await Category.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.newName,
          description: req.body.newDescription,
          updatedDate: new Date(),
        },
      },
      { omitUndefined: true } //Accept only defined values
    );

    return 200;
  } else {
    //Category not found
    return 404;
  }
};

exports.deleteCategoryService = async (req) => {
  //Find category first
  const category = await Category.findById(req.params.id);

  if (category) {
    //Check if category has any tracks related to it
    const tracks = await Track.findOne({ categoryId: req.params.id });

    if (tracks) {
      //One track found, can't delete
      return 409;
    } else {
      //No tracks found, now delete category
      await Category.deleteOne({ _id: req.params.id });

      return 200;
    }
  } else {
    //No category found
    return 404;
  }
};
