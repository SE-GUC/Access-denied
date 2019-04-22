const mongoose = require('mongoose')
const MessageSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  message: String,
  date: {
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('Message', MessageSchema)
