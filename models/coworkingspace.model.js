const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ObjectId = mongoose.Schema.Types.ObjectId
let CoworkingSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    city: { type: String, required: true },
    area: { type: String, required: true },
    street: { type: String, required: true }
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
  workingHours: {
    from: String,
    to: String
  },
  noOfRooms: Number,
  description: String,
  schedule: {
    type: ObjectId,
    ref: 'Schedule'
  }
})

module.exports = mongoose.model('CoworkingSpace', CoworkingSchema)
