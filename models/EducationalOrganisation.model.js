const mongoose = require('mongoose');
const uri = "mongodb+srv://MubbyGN:nwoFDbE9QE6z0iEE@se-qt9vz.mongodb.net/test?retryWrites=true"

mongoose.connect(uri,{useNewUrlParser:true})

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
   certificate:[String],
   trainer:[String],
   trainingProgram:[String]
    })

var Mymodel = mongoose.model("EducationalOrganisation", EducationalOrganisationSchema);

module.exports = Mymodel;