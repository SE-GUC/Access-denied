const Joi = require("joi");

module.exports = {
  createValidation: request => {
    const createSchema = {
      name : Joi.string()
        .min(3)
        .max(500)
        .required(),
    
      Evaluation_procedure: Joi.string().required(),
      skills: Joi,
      Fees: Joi.number(),
      Method_of_payment: Joi.string(),
      membersapplied: Joi,
      membersaccepted: Joi,
      eduorganization: Joi.string()
      
    };

    return Joi.validate(request, createSchema);
  },

  updateValidation: request => {
    const updateSchema = {
      name : Joi.string()
        .min(3)
        .max(500),
      Evaluation_procedure: Joi.string(),
      skills: Joi,
      Fees: Joi.number(),
      Method_of_payment: Joi.string(),
      membersapplied: Joi,
      membersaccepted: Joi,
      eduorganization: Joi.string()
    };

    return Joi.validate(request, updateSchema);
  }
};
