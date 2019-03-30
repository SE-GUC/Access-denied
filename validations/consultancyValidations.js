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
      phoneNumber: Joi.string().required(),
      address: Joi.string().required(),
      partners: Joi,
      boardMembers: Joi,
      events: Joi,
      reports: Joi
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      name: Joi.string()
        .min(3)
        .max(500),
      email: Joi.string().email(),
      phoneNumber: Joi.string(),
      address: Joi.string(),
      partners: Joi,
      boardMembers: Joi,
      events: Joi,
      reports: Joi
    }

    return Joi.validate(request, updateSchema)
  }
}
