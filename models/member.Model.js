const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  certification: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Certification'
    }
  ]
})
module.exports = mongoose.model('Members', MemberSchema)