const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

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

  partners: [String],

  information: String,

  course: [String],

  certificate: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Certification'
    }
  ],
  trainer: [String],

  trainingProgram: [String]
})

var Mymodel = mongoose.model(
  'EducationalOrganisation',
  EducationalOrganisationSchema
)
//Mymodel.collection.drop();

module.exports = Mymodel
