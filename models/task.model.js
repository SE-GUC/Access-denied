/**
 * @author: Omar I. Handouk
 * @exports: taskModel
 * @description: This file handles the schema for the (Task Entity) it exports a usable model for further use
 */

'use strict'

const mongoose = require('mongoose')

// IMPORTANT TODO: Hide ENV variables in dotENV file, and setup env vars at deployment

let taskSchema = new mongoose.Schema({
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
  skillset: [String]
})

//delete mongoose.connection.models['Tasks']
//delete mongoose.connection.models['Task']

let taskModel = mongoose.model('Task', taskSchema)

//taskModel.collection.drop()

module.exports = taskModel
