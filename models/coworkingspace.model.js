const mongoose =require('mongoose');
const Schema = mongoose.Schema;

var ObjectId = mongoose.Schema.Types.ObjectId
let CoworkingSchema = new Schema({
    name: {
        type:String,
        required:true
    },   
    address:{
        city:String,
        area:String,
        street:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique:true
    },
    workingHours:{
        from:String,
        to:String
    },
    noOfRooms:Number,
    description:String,
    schedule:ObjectId

});

module.exports= mongoose.model('CoworkingSpace',CoworkingSchema);