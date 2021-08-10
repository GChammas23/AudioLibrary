const Category = require("../Models/category");
const Track = require("../Models/track");

exports.addCategory = async (category) => {
  //Create object from model with given values
  const newCategory = new Category(category);

  //Save category to DB
  const result = await newCategory.save();
  return result._id;
};

exports.getCategories = async () => {
  const result = await Category.find();

  return result;
};

exports.getCategoryById = async (id) => {
  const category = await Category.findById(id);

  return category;
};

exports.updateCategoryById = async (values, id) => {
  const category = await Category.findById(id);

  if (category) {
    //Category found, now update it
    await Category.updateOne(
      { _id: id },
      {
        $set: values,
      },
      { omitUndefined: true } //Accept only defined values
    );

    return 200;
  } else {
    //Category not found
    return 404;
  }
};

exports.deleteCategoryById = async (id) => {
  //Find category first
  const category = await Category.findById(id);

  if (category) {
    //Check if category has any tracks related to it
    const tracks = await Track.findOne({ categoryId: id });

    if (tracks) {
      //One track found, can't delete
      return 409;
    } else {
      //No tracks found, now delete category
      await Category.deleteOne({ _id: id });

      return 200;
    }
  } else {
    //No category found
    return 404;
  }
};
