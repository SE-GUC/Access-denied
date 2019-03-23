const mongoose = require('mongoose')


const certificationSchema = new mongoose.Schema({

    name_of_certification: {
        type: String,
        required: true,
        unique: false
    },
    id_of_certification: {
        type: String,
        required: true,
        unique: true
    },
    Evaluation_of_available: Date,
    Fees: Number,
    Method_of_payment: String,
    



    Evaluation_procedure: {
        type: String,
        required: true
    },
    
membersapplied: [
    {MEMBERS:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Members',
    required: true    
},
finished : Boolean
}]

         
    


})


module.exports = mongoose.model("Certification", certificationSchema)