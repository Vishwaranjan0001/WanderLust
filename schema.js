const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        category: Joi.string()
            .valid("mountains", "beach", "city", "lake", "desert", "forest", "heritage")
            .required(),
        price: Joi.number().required(),
        image: Joi.object({
            url: Joi.string().allow("", null),
            filename: Joi.string().allow("", null)
        }).optional()
    }).required()
});