const mongoose = require("mongoose")
const uri = "mongodb+srv://MubbyGN:nwoFDbE9QE6z0iEE@se-qt9vz.mongodb.net/test?retryWrites=true"
mongoose.connect(uri, {useNewUrlParser:true})

const ReviewSchema = new mongoose.Schema ({
    reviewer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Members',
        required: true
    },
    reviewee:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Members',
        required: true
    },
    review:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        min: 1,
        max: 5,
        required: true
    }

})

//ReviewSchema.index({ reviewer: 1, reviewee: 1 }, { unique: true });
module.exports = mongoose.model("Reviews", ReviewSchema)