
const mongoose = require('mongoose');
//const uri = "mongodb+srv://MubbyGN:Mk4NAfw7XjkH0Dcb@se-qt9vz.mongodb.net/test?retryWrites=true"

//mongoose.connect(uri,{useNewUrlParser:true})
let ObjectId = mongoose.Schema.Types.ObjectId;
const EvaluationSchema = new mongoose.Schema({
   styleOfEvaluation:{
       //MCQ, code,etc
       type:String,
       required:true
   },

   link:{
       type:String}, //link to evaluation

 

   duration:Number, //duration of evaluation

   certificate:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Certification'
 }, //reference to certification




 })

let Mymodel = mongoose.model("Evaluation", EvaluationSchema);
//Mymodel.collection.drop();
module.exports = Mymodel;

