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
      name_of_certification: String,
      skills: [String],
      ref_of_certification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Certification'
      }}
  ],
  calendar:[Date]
})
//delete mongoose.connection.models['Members']
//delete mongoose.connection.collections['Members']
const myModel =module.exports = mongoose.model('Members', MemberSchema)
//myModel.collection.drop()