const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      owner: Joi.string(),
      assignee: Joi.string(),
      consultancy: Joi.string(),
      description: Joi.string()
        .min(3)
        .max(500),
      extraNotes: Joi.string()
        .min(3)
        .max(500),
      isCompleted: Joi.boolean(),
      date: Joi.date(),
      effortLevel: Joi.number(),
      commitmentLevel: Joi.number(),
      experienceLevel: Joi.number(),
      timeRequired: Joi.number(),
      monetaryComp: Joi.number(),
      skillset: Joi.array().items(Joi.string())
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      owner: Joi.string(),
      assignee: Joi.string(),
      consultancy: Joi.string(),
      description: Joi.string()
        .min(3)
        .max(500),
      extraNotes: Joi.string()
        .min(3)
        .max(500),
      isCompleted: Joi.boolean(),
      date: Joi.date(),
      effortLevel: Joi.number(),
      commitmentLevel: Joi.number(),
      experienceLevel: Joi.number(),
      timeRequired: Joi.number(),
      monetaryComp: Joi.number(),
      skillset: Joi.array().items(Joi.string())
    }

    return Joi.validate(request, updateSchema)
  }
}
