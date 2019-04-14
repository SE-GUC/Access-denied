const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      requester: Joi.string(),
      route: Joi.string(),
      type: Joi.string(),
      description: Joi.string(),
      Date: Joi.date(),
      body: Joi.object()
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      requester: Joi.string(),
      route: Joi.string(),
      type: Joi.string(),
      description: Joi.string(),
      Date: Joi.date(),
      body: Joi.object()
    }

    return Joi.validate(request, updateSchema)
  }
}
