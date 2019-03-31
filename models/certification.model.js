const mongoose = require("mongoose");
     

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
      MEMBERS: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Members'
      }
    }
  ],
  membersaccepted  :[
    {
      MEMBERS: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Members'
      }
    }
  ],

  eduorganization: {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'EducationalOrganisation'
  } 
  
 
});
 


const myModel = mongoose.model("Certification", certificationSchema);



module.exports = myModel