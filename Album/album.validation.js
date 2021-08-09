const { Joi } = require("express-validation");

exports.albumSchema = {
  body: Joi.object({
    name: Joi.string()
      .required()
      .messages({
        "any.required": "The album must have a name!",
        "string.empty": "Name can't be empty!",
      }),
    description: Joi.string(),
    showNumbOfTracks: Joi.boolean().default(false),
  }),
};
