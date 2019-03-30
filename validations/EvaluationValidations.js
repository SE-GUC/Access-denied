const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            
            certificate: Joi,
            styleOfEvaluation:Joi.string().required(),
            link: Joi.string().required(),
            EducationalOrganisation: Joi,
             dateOfEvaluation:Joi.date(),
             durationOfExamInHours:Joi.number()

    return Joi.validate(request, createSchema)
  },

  updateValidation: request => {
    const updateSchema = {
      evaluationCode: Joi.string()
        .min(3)
        .max(500),
      certificationName: Joi.string()
        .min(3)
        .max(100),
      certificationCode: Joi.string(),
      styleOfEvaluation: Joi.string(),
      link: Joi.string(),
      dateOfEvaluation: Joi.date(),
      durationOfExamInHours: Joi.number(),
      nameOfEducationalOrganisationOfferingIt: Joi.string(),
      emailCOfEducationalOrganisationOfferingIt: Joi.string()
    }

        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            certificate: Joi,
            styleOfEvaluation:Joi.string().required(),
            link: Joi.string().required(),
            EducationalOrganisation: Joi,
             dateOfEvaluation:Joi.date(),
             durationOfExamInHours:Joi.number()
            
             
        }

        return Joi.validate(request, updateSchema)
    }, 
}
