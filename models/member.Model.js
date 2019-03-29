const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: false, // TODO: Change it to non unique
    },
    certification: [
        {
            name_of_certification: String,
            skills: [String],
            name_of_certification_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Certification',
            },
        },
    ],
})
module.exports = mongoose.model('Members', MemberSchema)
