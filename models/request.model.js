/**
 * @author: Ahmed M. ELzamarany
 * @exports: requestModel
 * @description: This file handles the schema for the (request Entity) it exports a usable model for further use by the admin
 */

'use strict'

const mongoose = require('mongoose')

let requestSchema = new mongoose.Schema({
  requester: String, //TODO :ref partner, members , users of the system
  route: {
    type: String,
    required: true
  },
  body: Object,
  type: {
    type: String,
    required: true,
    enum: ['POST', 'PUT', 'GET', 'DELETE']
  },
  description: String,
  Date: {
    type: Date,
    default: new Date()
  }
})

// delete mongoose.connection.models['requests']
// delete mongoose.connection.models['request']

let requestModel = mongoose.model('request', requestSchema)

// requestModel.collection.drop()

module.exports = requestModel
