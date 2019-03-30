const mongoose = require('mongoose')

const EducationalOrganisationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    city: String,
    area: String,
    street: String
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  contactInformation: String,
  vision: String,
  mission: String,
  partners: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Partners'
    }
  ],
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
