const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      certificate: Joi,
      styleOfEvaluation: Joi.string().required(),
      link: Joi.string().required(),
      EducationalOrganisation: Joi,
      duration: Joi.number()
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      certificate: Joi,
      styleOfEvaluation: Joi.string().required(),
      link: Joi.string().required(),
      EducationalOrganisation: Joi,
      duration: Joi.number()
    }

    return Joi.validate(request, updateSchema)
  }
}