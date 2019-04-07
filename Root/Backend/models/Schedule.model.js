const mongoose = require('mongoose')

let ObjectId = mongoose.Schema.Types.ObjectId

const ScheduleSchema = new mongoose.Schema({
  //A Schedule is built of 7 days, each day has a list of slots (1-hour each)
  Saturday: [
    {
      from: {
        type: Number,
        required: true
      },
      to: {
        type: Number,
        required: true
      },
      available: {
        type: Boolean,
        required: true,
        default: true
      },
      assignedTo: [
        {
          type: ObjectId,
          ref: 'Members'
        }
      ]
    }
  ],
  Sunday: [
    {
      from: {
        type: Number,
        required: true
      },
      to: {
        type: Number,
        required: true
      },
      available: {
        type: Boolean,
        required: true,
        default: true
      },
      assignedTo: [
        {
          type: ObjectId,
          ref: 'Members'
        }
      ]
    }
  ],
  Monday: [
    {
      from: {
        type: Number,
        required: true
      },
      to: {
        type: Number,
        required: true
      },
      available: {
        type: Boolean,
        required: true,
        default: true
      },
      assignedTo: [
        {
          type: ObjectId,
          ref: 'Members'
        }
      ]
    }
  ],
  Tuesday: [
    {
      from: {
        type: Number,
        required: true
      },
      to: {
        type: Number,
        required: true
      },
      available: {
        type: Boolean,
        required: true,
        default: true
      },
      assignedTo: [
        {
          type: ObjectId,
          ref: 'Members'
        }
      ]
    }
  ],
  Wednesday: [
    {
      from: {
        type: Number,
        required: true
      },
      to: {
        type: Number,
        required: true
      },
      available: {
        type: Boolean,
        required: true,
        default: true
      },
      assignedTo: [
        {
          type: ObjectId,
          ref: 'Members'
        }
      ]
    }
  ],
  Thursday: [
    {
      from: {
        type: Number,
        required: true
      },
      to: {
        type: Number,
        required: true
      },
      available: {
        type: Boolean,
        required: true,
        default: true
      },
      assignedTo: [
        {
          type: ObjectId,
          ref: 'Members'
        }
      ]
    }
  ],
  Friday: [
    {
      from: {
        type: Number,
        required: true
      },
      to: {
        type: Number,
        required: true
      },
      available: {
        type: Boolean,
        required: true,
        default: true
      },
      assignedTo: [
        {
          type: ObjectId,
          ref: 'Members'
        }
      ]
    }
  ]
})

module.exports = mongoose.model('Schedule', ScheduleSchema)
