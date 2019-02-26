const mongoose = require("mongoose")
const uri = "mongodb+srv://MubbyGN:nwoFDbE9QE6z0iEE@se-qt9vz.mongodb.net/test?retryWrites=true"
mongoose.connect(uri, {useNewUrlParser:true})

const PartnerSchema = new mongoose.Schema({
    //basic business information 
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    field_of_work: {
        type: String,
        required: true,
        unique: true
    },
    //their partners
    other_partner:{
        type:Number,
        unique: true
    },
    //board members
    member :[ {
        name:String,
        age:Number,
        email:String
    }],
    //events
    events :[ {
        name:String,
        location:String,
        email:String
    }]
})

module.exports = mongoose.model("Partners", PartnerSchema)