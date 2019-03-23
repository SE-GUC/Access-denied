const Joi = require('joi')

module.exports = {
    createValidation: request => {
        const createSchema = {
            evaluationCode: Joi.string().min(3).max(500).required(),
            certificationName: Joi.string().min(3).max(100).required(),
            certificationCode: Joi.string().required(),
            styleOfEvaluation:Joi.string().required(),
            link: Joi.string().required(),
             nameOfEducationalOrganisationOfferingIt:Joi.string().required(),
             emailCOfEducationalOrganisationOfferingIt:Joi.string().required(),
             dateOfEvaluation:Joi.date(),
             durationOfExamInHours:Joi.number()



        }

        return Joi.validate(request, createSchema)
    },

    updateValidation: request => {
        const updateSchema = {
            evaluationCode: Joi.string().min(3).max(500).required(),
            certificationName: Joi.string().min(3).max(100).required(),
            certificationCode: Joi.string().required(),
            styleOfEvaluation:Joi.string().required(),
           
            link: Joi.string().required(),
            dateOfEvaluation:Joi.date(),
            durationOfExamInHours:Joi.number(),
             nameOfEducationalOrganisationOfferingIt:Joi.string().required(),
             emailCOfEducationalOrganisationOfferingIt:Joi.string().required()
            
             
        }

        return Joi.validate(request, updateSchema)
    }, 
}