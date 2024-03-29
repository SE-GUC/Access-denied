const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      name: Joi.string(),
      owner: Joi.string(),
      assignee: Joi.string(),
      consultancy: Joi.string(),
      description: Joi.string()
        .min(3)
        .max(500),
      extraNotes: Joi.string()
        .min(3)
        .max(500),
      isComplete: Joi.boolean(),
      date: Joi.date(),
      effortLevel: Joi.number().max(10),
      commitmentLevel: Joi.number(),
      experienceLevel: Joi.number(),
      timeRequired: Joi.number(),
      monetaryComp: Joi.number(),
      applications: Joi.array().items(
        Joi.object({
          applier: Joi,
          date: Joi.date(),
          details: Joi,
          applierModel: Joi
        })
      ),
      paymentMethod: Joi,
      skills: Joi.array().items(Joi.string()),
      Keywords: Joi,
      phase: Joi.string()
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      name: Joi.string(),
      owner: Joi.string(),
      assignee: Joi.string(),
      consultancy: Joi.string(),
      description: Joi.string()
        .min(3)
        .max(500),
      extraNotes: Joi.string()
        .min(3)
        .max(500),
      isComplete: Joi.boolean(),
      paymentMethod: Joi,
      date: Joi.date(),
      effortLevel: Joi.number().max(10),
      commitmentLevel: Joi.number(),
      experienceLevel: Joi.number(),
      timeRequired: Joi.number(),
      monetaryComp: Joi.number(),
      skills: Joi.array().items(Joi.string()),
      applications: Joi.array().items(
        Joi.object({
          applier: Joi,
          date: Joi.date(),
          details: Joi,
          applierModel: Joi
        })
      ),
      Keywords: Joi,
      phase: Joi.string()
    }

    return Joi.validate(request, updateSchema, { stripUnknown: true })
  }
}
