const mongoose = require('mongoose')

const EducationalOrganisationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  contactInformation: String,
  vision: String,
  mission: String,
  partners: [String],
  information: String,
  course: [String],
  certificate: [String],
  trainer: [String],
  trainingProgram: [String]
})

let Mymodel = mongoose.model(
  'EducationalOrganisation',
  EducationalOrganisationSchema
)

module.exports = Mymodel
