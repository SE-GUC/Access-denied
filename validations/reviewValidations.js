const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      reviewer: Joi.required(),
      reviewee: Joi.required(),
      review: Joi.string()
        .min(3)
        .max(500)
        .required(),
      rating: Joi.number()
        .min(1)
        .max(5)
        .required(),
      task: Joi.required(),
      reviewerModel: Joi.string().required(),
      revieweeModel: Joi.string().required()
    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
      reviewer: Joi,
      reviewee: Joi,
      review: Joi.string()
        .min(3)
        .max(500),
      rating: Joi.number()
        .min(1)
        .max(5),
      task: Joi,
      reviewerModel: Joi.string(),
      revieweeModel: Joi.string()
    };

    return Joi.validate(request, updateSchema);
  }
};