const {Joi} = require("express-validation");

exports.categorySchema = {
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
    })
}
