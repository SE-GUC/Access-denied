const mongoose = require("mongoose");

const PartnerSchema = new mongoose.Schema({
  //*basic business information :
  // 1- name of company,
  name: {
    type: String,
    required: true,
    unique: true
  },
  //2- contact info,
  email: {
    type: String,
    required: true,
    unique: true
  },
  Telephone_number: {
    type: Number,
    required: false,
    unique: false
  },
  //other contact links (social media)
  other: [
    {
      name: String
    }
  ],
  //*location
  location: {
    type: String,
    required: true,
    unique: true
  },
  //*number of employees
  number_of_employees: {
    type: Number,
    required: false,
    unique: false
  },

  //*their past projects ?

  //*their filed of work
  field_of_work: {
    type: String,
    required: true
   
  },
  //*their partners?
  other_partner: {
    type: String
    

    
  },
  //*their board members
  member: [
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
      name: String,
      location: String,
      email: String
    }
  ]
});
//adding a form to suggest any feedback.

module.exports = mongoose.model("Partners", PartnerSchema);
