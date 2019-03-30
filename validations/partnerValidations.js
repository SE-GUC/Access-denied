const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            name: Joi.string().min(3).max(500).required(),
            email: Joi.string().email().required(),
            field_of_work: Joi.string().min(3).max(500).required(),
            other_partner: Joi.string().min(3).max(500),
            location: Joi.string().min(3).max(500).required(),
            Telephone_number: Joi.number(),
            other: Joi.array().string(),
            number_of_employees: Joi.number()
            //member: Joi.array().items(Joi.string(), Joi.number(),joi.string(),joi.string()),
            //events: Joi.array().items(Joi.string(),joi.string(),joi.string())



        }

    return Joi.validate(request, createSchema)
  },

    updateValidation: request => {
        const updateSchema = {
            /*name: Joi.string().min(3).max(500),
            email: Joi.string().email(),
            field_of_work: Joi.string().min(3).max(500),
            other_partner: Joi.string().min(3).max(500),
            location: Joi.string().min(3).max(500).required()*/

            name: Joi.string().min(3).max(500).required(),
            email: Joi.string().email().required(),
            field_of_work: Joi.string().min(3).max(500).required(),
            other_partner: Joi.string().min(3).max(500),
            location: Joi.string().min(3).max(500).required(),
            Telephone_number: Joi.number(),
            other: Joi.array().items(string()),
            number_of_employees: Joi.number()
            //member: Joi.array().items(Joi.string(), Joi.number(),joi.string(),joi.string()),
           // events: Joi.array().items(Joi.string(),joi.string(),joi.string())
        }

    return Joi.validate(request, updateSchema)
  }
}
