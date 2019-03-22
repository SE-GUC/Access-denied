/**
 * @author: Omar I. Handouk
 * @exports: taskModel
 * @description: This file handles the schema for the (Task Entity) it exports a usable model for further use
 */

"use strict";

const mongoose = require('mongoose')

// IMPORTANT TODO: Hide ENV variables in dotENV file, and setup env vars at deployment 
const URI = 'mongodb+srv://MubbyGN:nwoFDbE9QE6z0iEE@se-qt9vz.mongodb.net/test?retryWrites=true'

mongoose.connect(URI, {
    useNewUrlParser: true
})

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
        ref: 'Partners',
        required: true
    },
    contactEmail: {
        type: String,
        required: true
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Members'
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
})

var taskModel = mongoose.model('Task', taskSchema)

/*
    Delete Task collection if needed, due to schema changes
*/

taskModel.collection.remove()

module.exports = taskModel