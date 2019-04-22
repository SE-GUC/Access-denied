const mongoose = require('mongoose')
const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  birthDate: Date,
  address: {
    city: String,
    area: String,
    street: String
  },
  payRate: Number,
  certification: [
    {
      name_of_certification: String,
      skills: [String],
      ref_of_certification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Certification'
      }
    }
  ],
  calendar: [{ Date: Date, Event: String }],
  memberSince: { type: Date, default: Date.now },
  expiryDate: Date,
  skills: [{type: mongoose.Schema.Types.ObjectId, ref:"Skills"}]
})
// delete mongoose.connection.models['Members']
// delete mongoose.connection.models['Member']
let MemberModel = mongoose.model('Members', MemberSchema)

// MemberModel.collection.drop()
module.exports = MemberModel
