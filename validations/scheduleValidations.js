const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      from: Joi.number().required(),
      to: Joi.number().required(),
      available: Joi.boolean().required(),
      assignedTo: Joi,
      day: Joi.string(),
      slotId: Joi
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      from: Joi.number().required(),
      to: Joi.number().required(),
      available: Joi.boolean().required(),
      assignedTo: Joi,
      day: Joi.string(),
      slotId: Joi
    }

    return Joi.validate(request, updateSchema)
  }
}
