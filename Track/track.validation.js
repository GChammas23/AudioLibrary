const {Joi} = require("express-validation");

exports.trackSchema = {
    body: Joi.object({
        name: Joi.string().required(),
        singer: Joi.string().required(),
    })
}