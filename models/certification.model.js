const mongoose = require('mongoose')
const uri = 'mongodb+srv://MubbyGN:nwoFDbE9QE6z0iEE@se-qt9vz.mongodb.net/test?retryWrites=true'

mongoose.connect(uri, {
    useNewUrlParser: true
})
var ObjectId = mongoose.Schema.Types.ObjectId
const certificationSchema = new mongoose.Schema({

    name_of_certification: {
        type: String,
        required: true,
        unique: true
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
    schedule:ObjectId



})


module.exports = mongoose.model("Certification", certificationSchema)