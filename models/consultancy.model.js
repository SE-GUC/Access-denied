const mongoose = require('mongoose')

const consultancySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    city: { type: String, required: true },
    area: { type: String, required: true },
    street: { type: String, required: true }
  },
  partners: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Partners'
    }
  ],
  boardMembers: [
    {
      //required?
      name: String,
      email: String,
      position: String
    }
  ],
  events: [
    {
      //needs to be an entity or not?
      date: Date,
      description: String
    }
  ],
  reports: [
    {
      link: String,
      date: Date
    }
  ]
})
//delete mongoose.connection.models['ConsultancyAgencies']
//delete mongoose.connection.models['ConsultancyAgency']
let consultancyModel = mongoose.model('ConsultancyAgencies', consultancySchema)

//consultancyModel.collection.drop()
module.exports = consultancyModel
