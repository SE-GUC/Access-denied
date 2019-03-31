/**
 * @author: Omar I. Handouk
 * @exports: taskModel
 * @description: This file handles the schema for the (Task Entity) it exports a usable model for further use
 */

'use strict'

const mongoose = require('mongoose')

// IMPORTANT TODO: Hide ENV variables in dotENV file, and setup env vars at deployment
function tags (s) {
   s.push('effortLevel='+this.effortLevel)
   s.push('commitmentLevel=' + this.commitmentLevel) 
   s.push('experienceLevel=' + this.experienceLevel) 
   s.push('timeRequired=' + this.timeRequired) 
   s.push('monetaryComp=' + this.monetaryComp) 
   s.push('skills=' + this.skills) 
  return s
}
var taskSchema = new mongoose.Schema({
  name: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Partners'
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
  skills: [String],
  Keywords: {
    type:[String],
    get :tags
  }
})

//delete mongoose.connection.models['Tasks']
//delete mongoose.connection.models['Task']

var taskModel = mongoose.model('Task', taskSchema)

//taskModel.collection.drop()

module.exports = taskModel
