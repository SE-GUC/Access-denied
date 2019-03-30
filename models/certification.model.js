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
    refPath: 'evaluationModel'
  },
  membersapplied: [
    {
      MEMBERS: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'Members'
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
    refPath: 'EducationalOrganisation'
  } 
  
 
});
 
//delete mongoose.connection.models['Certification']
//delete mongoose.connection.collections['Certification']

const myModel = mongoose.model("Certification", certificationSchema);

//myModel.collection.drop()

module.exports = myModel