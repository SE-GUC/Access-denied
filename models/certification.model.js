const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;

const certificationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  skills: [String],
  Evaluation_of_available: Date,
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
        ref: "Members"
      },
      finished: Boolean
    }
  ],
  membersacceptedt:[
    {
      MEMBERS: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Members"
      }
    }
  ]
 
});
 

module.exports = mongoose.model("Certification", certificationSchema);
