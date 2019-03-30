const mongoose = require('mongoose')
//const uri = 'mongodb+srv://MubbyGN:Mk4NAfw7XjkH0Dcb@se-qt9vz.mongodb.net/test?retryWrites=true'

/*mongoose.connect(uri, {
    useNewUrlParser: true
})*/
let ObjectId = mongoose.Schema.Types.ObjectId

const certificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  id_of_certification: {
    type: String,
    required: true,
    unique: true
  },
  skills: [String],
  Evaluation_of_available: Date,
  Fees: Number,
  Method_of_payment: String,
  Evaluation_procedure: {
    type: String,
    required: true
  },
  membersapplied: [
    {
      MEMBERS: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Members'
      },
      finished: Boolean
    }
  ],
  schedule: {
    type: ObjectId,
    ref: 'Schedule'
  }
})

module.exports = mongoose.model('Certification', certificationSchema)
