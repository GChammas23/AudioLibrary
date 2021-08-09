const { Joi } = require("express-validation");

exports.trackSchema = {
  body: Joi.object({
    name: Joi.string().required().messages({
      "any.required": "The track must have a name!",
      "string.empty": "Name can't be empty!",
    }),
    singer: Joi.string().required().messages({
      "any.required": "The track must have a singer!",
      "string.empty": "Singer can't be empty!",
    }),
  }),
};
