const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      title: Joi
        .string()
        .required(),
      description: Joi
        .string()
        .required()
        .min(20),
      owner: Joi.required(),
      date: Joi.date()
    }

    return Joi.validate(request, createSchema)
  },

  updateInformationValidation: request => {
    const updateInfoSchema = {
      title: Joi
        .string(),
      description: Joi
        .string()
        .min(20),
      owner: Joi,
      date: Joi.date()
    }

    return Joi.validate(request, updateInfoSchema)
  },

  updateTasksValidation: request => {
    const updateTasksSchema = {
      tasks: Joi
    }

    return Joi.validate(request, updateSchema)
  }
}