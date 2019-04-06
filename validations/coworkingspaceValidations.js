const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string()
        .min(3)
        .max(500)
        .required(),
      address: Joi.required(),
      email: Joi.string()
        .email()
        .required(),
      phoneNumber: Joi.string().required(),
      workingHours: Joi,
      description: Joi.string(),
      schedule: Joi,
      noOfRooms: Joi.number()
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
      phoneNumber: Joi.string(),
      workingHours: Joi,
      description: Joi.string(),
      schedule: Joi,
      noOfRooms: Joi.number()
    }

    return Joi.validate(request, updateSchema)
  }
}
