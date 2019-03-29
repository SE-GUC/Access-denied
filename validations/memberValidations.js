const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name: Joi.string()
                .min(3)
                .max(500)
                .required(),
            email: Joi.string()
                .email()
                .required(),
            password: Joi.string()
                .min(6)
                .max(30)
                .required(),
            certification: Joi,
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            name: Joi.string()
                .min(3)
                .max(500),
            email: Joi.string().email(),
            password: Joi.string()
                .min(6)
                .max(30),
            certification: Joi,
        }

        return Joi.validate(request, updateSchema)
    },
}
