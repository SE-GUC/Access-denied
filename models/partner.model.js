const mongoose = require('mongoose')
// delete mongoose.connection.models['Partners']
const PartnerSchema = new mongoose.Schema({
  //*basic business information :
  // 1- name of company,
  name: {
    type: String,
    required: true,
    unique: true
  },
  //2- contact info,

  Telephone_number: {
    type: Number
  },
  //other contact links (social media)
  other: [
    {
      name: String,
      link: String
    }
  ],
  //*location
  address: {
    city: String,
    area: String,
    street: String
  },
  //*number of employees
  number_of_employees: {
    type: Number
  },

  //*their past projects ?

  //*their filed of work
  field_of_work: {
    type: String,
    required: true
  },
  //*their partners?
  other_partners: {
    type: String
  },
  //*their board members
  members: [
    {
      name: String,
      age: Number,
      email: String,
      past_work: String
    }
  ],
  //*events organized by the organization?
  events: [
    {
      //needs to be an entity or not?
      date: Date,
      description: String,
      address: {
        city: String,
        area: String,
        street: String
      }
    }
  ]
})
//adding a form to suggest any feedback.
// const var1 = mongoose.model('Partners', PartnerSchema)
// delete mongoose.connection.models['Partners']
// var1.collection.drop()
module.exports = mongoose.model('Partners', PartnerSchema)
