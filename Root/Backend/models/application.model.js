const mongoose = require('mongoose')

const objectId = mongoose.Schema.Types.ObjectId

const applicationSchema = new mongoose.Schema({
  task: {
    type: objectId,
    ref: 'Task',
    required: true
  },
  applier: {
    type: objectId,
    refPath: 'applierModel',
    required: true
  },
  date: {
    type: Date,
    default: new Date()
  },
  details: {
    type: String,
    required: true
  },
  applierModel: {
    type: String,
    required: true,
    enum: ['Members', 'ConsultancyAgencies']
  }
})

module.exports = new mongoose.model('Applications', applicationSchema)
