const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string()
        .min(3)
        .max(500)
        .required(),

      certification: Joi,
      calendar: Joi.array(),
      birthDate: Joi.date().required(),
      address: Joi,
      payRate: Joi.number(),
      expiryDate: Joi.date()
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      name: Joi.string()
        .min(3)
        .max(500),

      certification: Joi,
      calendar: Joi.array(),
      birthDate: Joi.date(),
      address: Joi,
      payRate: Joi.number(),
      expiryDate: Joi.date()
    }

    return Joi.validate(request, updateSchema)
  }
}
