/**
 * @author: Omar I. Handouk
 * @exports: taskModel
 * @description: This file handles the schema for the (Task Entity) it exports a usable model for further use
 */

'use strict'

const mongoose = require('mongoose')

// IMPORTANT TODO: Hide ENV variables in dotENV file, and setup env vars at deployment

let taskSchema = new mongoose.Schema({
  name: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partners'
    // ,    get:hi
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Members'
  },
  consultancy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ConsultancyAgencies'
  },
  description: {
    type: String
  },
  extraNotes: {
    type: String
  },
  isComplete: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  },
  effortLevel: {
    type: Number
  },
  commitmentLevel: {
    type: Number
  },
  experienceLevel: {
    type: Number
  },
  timeRequired: {
    type: Number
  },
  monetaryComp: {
    type: Number
  },
  skills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skills' }],
  keywords: [String],
  applied_members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Members'
    }
  ],
  applications:[{
    applier: {
      type: mongoose.Schema.Types.ObjectId,
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
    }],
  phase: {
    type: String,
    enum: [
      'Awaiting approval',
      'Looking for ConsultancyAgencies',
      'Consultancy hired',
      'Looking for Members',
      'Ongoing',
      'Completed'
    ],
    default: 'Awaiting approval'
  },
  paymentMethod: {
    type: String,

    enum: ['Cash', 'fawry', 'visa', 'creditCard', 'PayPal', 'CIBTransfer']
  },
})

taskSchema.set('toObject', { virtuals: true })
taskSchema.set('toJSON', { virtuals: true })
taskSchema.virtual('Tags').get(function get() {
  let s = []
  if (this.owner) s.push('OwnerName:' + this.owner.name)
  if (this.effortLevel) s.push('effortLevel:' + this.effortLevel)
  if (this.commitmentLevel) s.push('commitmentLevel:' + this.commitmentLevel)
  if (this.experienceLevel) s.push('experienceLevel;' + this.experienceLevel)
  if (this.timeRequired) s.push('timeRequired:' + this.timeRequired)
  if (this.monetaryComp) s.push('monetaryComp:' + this.monetaryComp)
  if (this.skills.length > 0) s.push('skills:' + this.skills)
  if (this.keywords.length > 0) s.push('others:' + this.keywords)

  return s
})

//delete mongoose.connection.models['Tasks']
//delete mongoose.connection.models['Task']
let taskModel = mongoose.model('Task', taskSchema)

// taskModel.collection.drop()

module.exports = taskModel
