const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name: Joi.string().min(3).max(500).required(),
            email: Joi.string().email().required(),
            address:Joi.string(),
            contactInformation: Joi.string(),
            vision: Joi.string(),
            mission: Joi.string(),
            partners: Joi.array(),
            information: Joi.string(),
            course: Joi.array(),
            certificate: Joi,
            trainer: Joi.array(),
            trainingProgram: Joi.array()

        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            name: Joi.string().min(3).max(500).required(),
            email: Joi.string().email().required(),
            address:Joi.string(),
            contactInformation: Joi.string(),
            vision: Joi.string(),
            mission: Joi.string(),
            partners: Joi.array(),
            information: Joi.string(),
            course: Joi.array(),
            certificate: Joi,
            trainer: Joi.array(),
            trainingProgram: Joi.array()
        }

        return Joi.validate(request, updateSchema)
    }, 
}