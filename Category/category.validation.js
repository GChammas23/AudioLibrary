const { Joi } = require("express-validation");

exports.categorySchema = {
  body: Joi.object({
    name: Joi.string()
      .required()
      .messages({
        "any.required": "The category must have a name!",
        "string.empty": "Name can't be empty!",
      }),
    description: Joi.string(),
  }),
};
