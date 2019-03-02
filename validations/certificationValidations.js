const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name_of_certification: Joi.string().min(3).max(500).required(),
            id_of_certification: Joi.string().min(3).max(100).required(),
            Evaluation_of_available: Joi.date().required(),
            Fees:Joi.number().required(),
            Evaluation_procedure: Joi.string().required()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            name_of_certification: Joi.string().min(3).max(500),
            id_of_certification: Joi.string().min(3).max(100),
            Evaluation_of_available: Joi.date(),
            Fees:Joi.number(),
            Evaluation_procedure: Joi.string()
        }

        return Joi.validate(request, updateSchema)
    }, 
}
