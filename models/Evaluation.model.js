
const mongoose = require('mongoose');
const uri = "mongodb+srv://MubbyGN:nwoFDbE9QE6z0iEE@se-qt9vz.mongodb.net/test?retryWrites=true"

mongoose.connect(uri,{useNewUrlParser:true})

const EvaluationSchema = new mongoose.Schema({


    evaluationCode:{

        type:String,
        required:true,
        unique:true

    },

    certificationName:{
        type:String,
        required:true
     }, 

   certificationCode:{
      type:String,
      required:true
   }, //code of certification to which the evaluation belongs
 
   styleOfEvaluation:{
       //MCQ, code,etc
       type:String,
       required:true
   },

   link:{
       type:String,
        required:true}, //link to evaluation

   dateOfEvaluation:Date, 

   durationOfExamInHours:Number,

   nameOfEducationalOrganisationOfferingIt:{
    type:String,
    required:true
},

   emailCOfEducationalOrganisationOfferingIt:{
       type:String,
       required:true
   }
 })

var Mymodel = mongoose.model("Evaluation", EvaluationSchema);

module.exports = Mymodel;

