const Joi = require("joi");

const createCourseValidation = Joi.object({

    title: Joi.string()
        .required(),

    description: Joi.string()
        .required(),
        
    thumbnail: Joi.string()
        .optional()

});

module.exports = {
    createCourseValidation
};