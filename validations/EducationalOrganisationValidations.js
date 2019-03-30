const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string()
        .min(3)
        .max(500)
        .required(),
      address: Joi,
      email: Joi.string()
        .email()
        .required(),
      contactInformation: Joi.string(),
      vision: Joi.string(),
      mission: Joi.string(),
      partners: Joi,
      information: Joi.string(),
      course: Joi,
      certificate: Joi,
      trainer: Joi,
      trainingProgram: Joi
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      name: Joi.string()
        .min(3)
        .max(500),
      address: Joi,
      email: Joi.string().email(),
      contactInformation: Joi.string(),
      vision: Joi.string(),
      mission: Joi.string(),
      partners: Joi,
      information: Joi.string(),
      course: Joi,
      certificate: Joi,
      trainer: Joi,
      trainingProgram: Joi
    }

    return Joi.validate(request, updateSchema)
  }
}
