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
        required: true,
        unique: true

    }

})
module.exports = mongoose.model("Members", MemberSchema)