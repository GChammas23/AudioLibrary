const {Joi} = require("express-validation");

exports.albumSchema = {
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string(),
        showNumbOfTracks: Joi.boolean().default(false)
    })
}