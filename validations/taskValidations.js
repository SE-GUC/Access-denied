const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      title: Joi.string()
        .min(3)
        .max(500)
        .required(),
      description: Joi.string()
        .min(3)
        .max(500),
      dateIssued: Joi.date(),
      assigner: Joi.string().required(),
      contactEmail: Joi.string().email(),
      assignee: Joi.string(),
      skills: Joi,
      isCompleted: Joi.boolean()
    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
      title: Joi.string()
        .min(3)
        .max(500),
      description: Joi.string()
        .min(3)
        .max(500),
      dateIssued: Joi.date(),
      assigner: Joi.string(),
      contactEmail: Joi.string().email(),
      assignee: Joi.string(),
      skills: Joi,
      isCompleted: Joi.boolean()
    };

    return Joi.validate(request, updateSchema);
  }
};
