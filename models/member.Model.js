const mongoose = require("mongoose")
/*const uri = "mongodb+srv://MubbyGN:nwoFDbE9QE6z0iEE@se-qt9vz.mongodb.net/test?retryWrites=true"
mongoose.connect(uri, {useNewUrlParser:true})*/

const MemberSchema = new mongoose.Schema ({
    name :{
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true,
        unique: false // TODO: Change it to non unique

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: false // TODO: Change it to non unique
  },
  certification: [
    {
      name_of_certification: String,
      skills: [String],
      name_of_certification_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Certification'
      }
    }
  ]
})
module.exports = mongoose.model('Members', MemberSchema)
