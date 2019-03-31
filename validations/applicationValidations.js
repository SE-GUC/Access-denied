const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      task: Joi.required(),
      applier: Joi.required(),
      date: Joi.date(),
      details: Joi.string()
        .min(10)
        .max(500)
        .required(),
      applierModel: Joi.string().required()
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      task: Joi,
      applier: Joi,
      date: Joi.date(),
      details: Joi.string()
        .min(10)
        .max(500),
      applierModel: Joi.string()
    }

    return Joi.validate(request, updateSchema)
  }
}
