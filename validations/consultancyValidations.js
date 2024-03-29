const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string()
        .min(3)
        .max(500)
        .required(),
      phoneNumber: Joi.string().required(),
      address: Joi.required(),
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
      phoneNumber: Joi.string(),
      address: Joi,
      partners: Joi,
      boardMembers: Joi,
      events: Joi,
      reports: Joi
    }

    return Joi.validate(request, updateSchema)
  }
}
