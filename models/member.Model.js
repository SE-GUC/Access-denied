const mongoose = require("mongoose")
const uri = "mongodb+srv://MubbyGN:nwoFDbE9QE6z0iEE@se-qt9vz.mongodb.net/test?retryWrites=true"
mongoose.connect(uri, {useNewUrlParser:true})

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
<<<<<<< HEAD
        required: true,
<<<<<<< HEAD
        unique: false // TODO: Change it to non unique
=======
=======
        required: true
>>>>>>> syntax fix
        
>>>>>>> changes in member schema

    }

})
module.exports = mongoose.model("Members", MemberSchema)