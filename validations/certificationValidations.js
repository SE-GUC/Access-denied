const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      name_of_certification: Joi.string()
        .min(3)
        .max(500)
        .required(),
      id_of_certification: Joi.string()
        .min(3)
        .max(100)
        .required(),
      Evaluation_of_available: Joi.date().required(),
      Evaluation_procedure: Joi.string().required(),
      skills: Joi,
      Fees: Joi.number(),
      Method_of_payment: Joi.string(),
      membersapplied: Joi,
      schedule: Joi
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      name_of_certification: Joi.string()
        .min(3)
        .max(500),
      id_of_certification: Joi.string()
        .min(3)
        .max(100),
      Evaluation_of_available: Joi.date(),
      Evaluation_procedure: Joi.string(),
      skills: Joi,
      Fees: Joi.number(),
      Method_of_payment: Joi.string(),
      membersapplied: Joi,
      schedule: Joi
    }

    return Joi.validate(request, updateSchema)
  }
}
