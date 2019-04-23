'use strict'
const express = require('express')
const router = express.Router()
const Request = require('../models/request.model')
const validator = require('../validations/requestValidations')
const axios = require('axios')
const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
mongoose.set('usefindandmodify', false)
const baseURL = process.env.BASEURL || 'http://localhost:3001'
const fetch = require('node-fetch')

//TODO:
//1-all post and pull routes should check if its admin or not
//if it's admin it will do its job
//if not it will make post request to this API
//2-add admin user story that take a request from the requests model then send it
//3-add validations DONE

/**
 * @description Post Document in Database
 * @returns Success/Error JSON
 * @requires token_id
 * @requires token_id
 */
router.post('/', (request, response) => {
  if (!request.query.token_id) {
    return response.status(400).send('400: token_id is missing')
  }

  let doc = request.body
  doc['requester'] = request.query.token_id //TODO :ref partner, members , users of the system
  const isValidated = validator.createValidation(doc)

  if (isValidated.error) {
    return response.status(400).send({
      error: isValidated.error.details[0].message
    })
  }
  Request.create(doc)
    .then(document => {
      if (!document || document.length === 0) {
        return response.status(500).json(document)
      }

      response.status(201).send(document)
    })
    .catch(error => {
      console.log(error)
      response.status(500).send(error)
    })
})

/*
    GET/READ route for Task Entity
    Either Get all the documents related to the Task Entity, or can be specified to fetch a certain document using 
*/

/**
 * @description Get Document in Database
 * @returns Success/Error JSON
 * @requires _id
 */

router.get('/', (request, response) => {
  let documentID = request.query.id

  if (!documentID) {
    return response
      .status(400)
      .status('400: Bad Request, no document ID is supplied')
  }

  let key = {
    _id: documentID
  }

  Request.findOne(key)
    .then(document => {
      if (!document || document.length == 0) {
        return response.status(500).json(document)
      }
      response.json(document)
    })
    .catch(error => {
      response.status(500).json(error)
    })
})

router.get('/all', (request, response) => {
  let key = {}
  if (request.query.filter) {
    key = JSON.parse(request.query.filter)
    var searchKey = new RegExp(key.route, 'i')
    key.route = { $in: searchKey }
  }

  Request.find(key)
    .then(document => {
      response.json(document)
    })
    .catch(error => {
      response.status(500).json(error)
    })
})

router.put('/', (request, response) => {
  let documentID = request.query.id

  if (!documentID) {
    return response
      .status(400)
      .status('400: Bad Request, no document ID is supplied')
  }

  const isValidated = validator.updateValidation(request.body)

  if (isValidated.error) {
    return response.status(400).send({
      error: isValidated.error.details[0].message
    })
  }

  let updatedDocument = request.body
  switch (updatedDocument.type) {
    case 'PUT':
      axios.put(baseURL + updatedDocument.route, updatedDocument.body)
      break
    case 'POST':
      axios.post(baseURL + updatedDocument.route, updatedDocument.body)
      break
    case 'DELETE':
      axios.delete(baseURL + updatedDocument.route, updatedDocument.body)
      break
    default:
      response.status(400).send('Bad Request')
  }
  Request.findByIdAndDelete(documentID)
    .then(doc => response.json('Done'))
    .catch(err => response.status(500).send('error'))
})

router.delete('/', (request, response) => {
  let documentID = request.query.id

  if (!documentID) {
    return response
      .status(400)
      .status('400: Bad Request, no document ID is supplied')
  }

  let key = {
    _id: documentID
  }

  Request.findOneAndDelete(key)
    .then(document => {
      if (!document || document.length == 0) {
        return response.status(500).json(document)
      }

      response.json(document)
    })
    .catch(error => {
      response.status(500).json(error)
    })
})

//Admin story for accepting requests and resend it
router.get('/Approve', (request, response) => {
  let documentID = request.query.id

  if (!documentID) {
    return response
      .status(400)
      .status('400: Bad Request, no document ID is supplied')
  }

  let key = {
    _id: documentID
  }

  Request.findOne(key)
    .then(document => {
      if (!document || document.length == 0) {
        return response.status(500).json(document)
      }
      console.log(baseURL + '/' + document.route)
      fetch(baseURL + '/' + document.route, {
        method: document.type,
        body: JSON.stringify(document.body),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      }).then(res => {
        console.log(res.status)
        response.send(res.status)
      })
    })
    .catch(error => {
      response.status(500).json(error)
    })
})
router.get('/partnerTasks', (req, res) => {
  let id = req.query.id

  let key = {
    requester: id,
    route: '/api/task',
    type: 'POST'
  }
  Request.find(key)
    .then(document => {
      if (!document || document.length == 0) {
        return res.status(500).json(document)
      }

      res.json(document)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})

router.get('/educationalCert', (req, res) => {
  let id = req.query.id

  let key = {
    requester: id,
    route: '/api/certification',
    type: 'POST'
  }
  Request.find(key)
    .then(document => {
      if (!document || document.length == 0) {
        return res.status(500).json(document)
      }

      res.json(document)
    })
    .catch(error => {
      res.status(500).json(error)
    })
})
module.exports = router
