const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name: Joi.string().min(3).max(500).required(),
            email: Joi.string().email().required(),
            field_of_work: Joi.string().min(3).max(500).required(),
            other_partner: Joi.string().min(3).max(500),
            location: Joi.string().min(3).max(500).required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            name: Joi.string().min(3).max(500),
            email: Joi.string().email(),
            field_of_work: Joi.string().min(3).max(500),
            other_partner: Joi.string().min(3).max(500)
        }

        return Joi.validate(request, updateSchema)
    }, 
}
