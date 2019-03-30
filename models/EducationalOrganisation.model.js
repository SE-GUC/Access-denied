




const mongoose = require('mongoose');
//const uri = "mongodb+srv://MubbyGN:Mk4NAfw7XjkH0Dcb@se-qt9vz.mongodb.net/test?retryWrites=true"

//mongoose.connect(uri,{useNewUrlParser:true})

var ObjectId = mongoose.Schema.Types.ObjectId;

const EducationalOrganisationSchema = new mongoose.Schema({
   name:{
      type:String,
      required:true,
   },

   address:String,

   email:{
      type:String,
      required:true,
      unique:true
   },

   contactInformation:String,

   vision:String,

   mission:String,

   partners:[String],

   information:String,

   course:[String],

   certificate:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Certification'
   }]
   ,

   trainer:[String],

   trainingProgram:[String]

    })

var Mymodel = mongoose.model("EducationalOrganisation", EducationalOrganisationSchema);


var Mymodel = mongoose.model(
  'EducationalOrganisation',
  EducationalOrganisationSchema
)

module.exports = Mymodel
