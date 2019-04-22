const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .max(30)
        .required(),
      type: Joi.string()
        .valid(
          "Members",
          "ConsultancyAgencies",
          "Partners",
          "CoworkingSpaces",
          "EducationalOrganisation"
        )
        .required()
    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
      email: Joi.string().email(),
      password: Joi.string()
        .min(6)
        .max(30),
      type: Joi.string().valid(
        "Members",
        "ConsultancyAgencies",
        "Partners",
        "CoworkingSpaces",
        "EducationalOrganisation"
      )
    };

    return Joi.validate(request, updateSchema, { stripUnknown: true });
  }
};
