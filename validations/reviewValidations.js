const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            reviewer: Joi,
            reviewee: Joi,
            review: Joi.string().min(3).max(500).required(),
            rating: Joi.number().min(1).max(5).required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            reviewer: Joi,
            reviewee: Joi,
            review: Joi.string().min(3).max(500),
            rating: Joi.number().min(1).max(5)
        }

        return Joi.validate(request, updateSchema)
    }, 
}
