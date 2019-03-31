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
      Telephone_number: Joi.number()
        .min(3)
        .max(500),
      other: Joi,
      address: Joi.required(),
      number_of_employees: Joi.number(),
      field_of_work: Joi.string()
        .min(3)
        .max(500)
        .required(),
      other_partners: Joi.string()
        .min(3)
        .max(500),
      members: Joi,
      events: Joi
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      name: Joi.string()
        .min(3)
        .max(500),
      email: Joi.string().email(),
      Telephone_number: Joi.Number()
        .min(3)
        .max(500),
      other: Joi,
      address: Joi,
      number_of_employees: Joi.number(),
      field_of_work: Joi.string()
        .min(3)
        .max(500),
      other_partners: Joi.string()
        .min(3)
        .max(500),
      members: Joi,
      events: Joi
    }

    return Joi.validate(request, updateSchema)
  }
}
