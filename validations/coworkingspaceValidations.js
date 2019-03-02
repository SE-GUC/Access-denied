const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name: Joi.string().min(3).max(500).required(),
            email: Joi.email().required(),
            phoneNumber: Joi.string().required(),
            noOfRooms:Joi.number()
        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            name: Joi.string().min(3).max(500),
            email: Joi.email(),
            phoneNumber: Joi.string(),
            noOfRooms:Joi.number()
        }

        return Joi.validate(request, updateSchema)
    }, 
}
