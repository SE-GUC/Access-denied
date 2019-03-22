const mongoose = require("mongoose")
const uri = "mongodb+srv://MubbyGN:nwoFDbE9QE6z0iEE@se-qt9vz.mongodb.net/test?retryWrites=true"
mongoose.connect(uri, {useNewUrlParser:true})

const consultancySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    partners: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Partners'
    }],
    boardMembers: [{ //required?
        name: String,
        email: String,
        position: String,
    }],
    events: [{ //needs to be an entity or not?
        date: Date,
        description: String
    }],
    reports: [{
        link: String,
        date: Date
    }]
    
})

module.exports = mongoose.model("ConsultancyAgencies", consultancySchema)