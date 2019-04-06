const mongoose = require('mongoose')

const certificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  skills: [String],
  Fees: Number,
  Method_of_payment: String,
  Evaluation_procedure: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'evaluationModel'
  },
  membersapplied: [
    {
<<<<<<< HEAD
      MEMBERS: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Members'
      }
    }
  ],
  membersaccepted: [
    {
      MEMBERS: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Members'
      }
    }
  ],
=======
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Members'
    }
  ],
  membersaccepted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Members'
    }
  ],
>>>>>>> 5229d307d733dcf0ec618672f8af49049539c6eb

  eduorganization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EducationalOrganisation'
  }
})

//delete mongoose.connection.models['Certification']
//delete mongoose.connection.collections['Certification']

const myModel = mongoose.model('Certification', certificationSchema)

module.exports = myModel
