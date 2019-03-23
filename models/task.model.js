/**
 * @author: Omar I. Handouk
 * @exports: taskModel
 * @description: This file handles the schema for the (Task Entity) it exports a usable model for further use
 */

"use strict";

const mongoose = require("mongoose");



var taskSchema = new mongoose.Schema({
  title: {

    type: String,
    required: true,
    unique: true
  },
  description: String,
  dateIssued: {
    type: String,
    Default: Date.now
  },
  assigner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Partners"
  },
  contactEmail: {
    type: String,
    required: true
  },
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Members"
  },

   skills : [String],
  isCompleted: {
    type: Boolean,
    default: false
  }
});


var taskModel = mongoose.model('Task', taskSchema)


module.exports = taskModel;