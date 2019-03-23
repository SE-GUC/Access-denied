const mongoose = require("mongoose")


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

    }

})
module.exports = mongoose.model("Members", MemberSchema)