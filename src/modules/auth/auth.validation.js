const Joi = require("joi");

const registerValidation = Joi.object({

    name: Joi.string()
        .required(),

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .min(6)
        .required()

});

const loginValidation = Joi.object({

    email: Joi.string()
        .email()
        .required(),

    password: Joi.string()
        .required()

});

const verifyOtpValidation = Joi.object({

    email: Joi.string()
        .email()
        .required(),

    otp: Joi.string()
        .length(6)
        .required()

});

module.exports = {
    registerValidation,
    loginValidation,
    verifyOtpValidation
};