const mongoose = require('mongoose')
const MessageSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'member'
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'member'
  },
  message: String,
  date: {
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('Message', MessageSchema)
