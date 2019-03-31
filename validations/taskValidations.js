const Joi = require('joi')

module.exports = {
  createValidation: request => {
    const createSchema = {
      name:Joi.string(),
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
      effortLevel: Joi.number(),
      commitmentLevel: Joi.number(),
      experienceLevel: Joi.number(),
      timeRequired: Joi.number(),
      monetaryComp: Joi.number(),
      skills: Joi.array().items(Joi.string()),
      Keywords: Joi
    }

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      name:Joi.string(),
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
      effortLevel: Joi.number(),
      commitmentLevel: Joi.number(),
      experienceLevel: Joi.number(),
      timeRequired: Joi.number(),
      monetaryComp: Joi.number(),
      skills: Joi.array().items(Joi.string()),
      Keywords: Joi
    }

    return Joi.validate(request, updateSchema)
  }
}
