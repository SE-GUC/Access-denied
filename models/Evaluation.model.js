
const mongoose = require('mongoose');
const uri = "mongodb+srv://MubbyGN:nwoFDbE9QE6z0iEE@se-qt9vz.mongodb.net/test?retryWrites=true"

mongoose.connect(uri,{useNewUrlParser:true})

const EvaluationSchema = new mongoose.Schema({

//code of evaluation
    evaluationCode:{

        type:String,
        required:true,
        unique:true

    },
//name of certification that is offered once the evaluation is passed successfully
    certificationName:{
        type:String,
        required:true
     }, 
//code of certification that is offered once the evaluation is passed successfully
   certificationCode:{
      type:String,
      required:true
   }, 
 
   styleOfEvaluation:{
       //MCQ, code,etc
       type:String,
       required:true
   },

   link:{
       type:String,
        required:true}, //link to evaluation

   dateOfEvaluation:Date, 

   durationOfExamInHours:Number, //duration of evaluation

   //name of educational organisation that offers this evaluation
   nameOfEducationalOrganisationOfferingIt:{
    type:String,
    required:true
},

    //emailC of educational organisation offereing the evaluation
   emailCOfEducationalOrganisationOfferingIt:{
       type:String,
       required:true
   }
 })

var Mymodel = mongoose.model("Evaluation", EvaluationSchema);
//Mymodel.collection.drop();
module.exports = Mymodel;

