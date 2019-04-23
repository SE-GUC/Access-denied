'use strict'

const express = require('express')
const axios = require('axios')

const projectModel = require('../models/project.model.js')
const validator = require('../validations/projectValidations.js')

const router = express.Router()

router.post('/', (request, response) => {
  if (!request.body) {
    return response.status(400).send({
      error: 'Body is Missing'
    })
  }

  let isValidate = validator.createValidation(request.body)

  if (isValidate.error) {
    return response.status(400).send({
      error: isValidated.error.details[0].message
    })
  }

  projectModel
    .create(request.body)
    .then(document => {
      if (!document || document.length === 0) {
        return response.status(500).json(document)
      }

      response.status(201).json(document)
    })
    .catch(error => {
      response.status(500).json(error)
    })
})

router.put('/:id', (request, response) => {
  if (!request.body) {
    return response.status(400).send({
      error: 'Body is Missing'
    })
  } else if (!request.params.id) {
    return response.status(400).send({
      error: 'Project ID is Missing'
    })
  }

  let isValidate = validator.updateInformationValidation(request.body)

  if (isValidate.error) {
    return response.status(400).send({
      error: isValidated.error.details[0].message
    })
  }

  let id = request.params.id
  let updatedDocument = request.body
  let options = {
    new: true,
    upsert: true
  }

  projectModel
    .findByIdAndUpdate(id, updatedDocument, options)
    .then(document => {
      if (!document || document.length === 0) {
        return response.status(500).json(document)
      }

      response.status(200).json(document)
    })
    .catch(error => {
      response.status(500).json(error)
    })
})

router.get('/', (request, response) => {
  projectModel
    .find()
    .populate('owner')
    .then(document => {
      if (!document || document.length === 0) {
        return response.status(500).json(document)
      }

      response.status(201).json(document)
    })
    .catch(error => {
      response.status(500).json(error)
    })
})

router.get('/:id', (request, response) => {
  if (!request.params.id) {
    return response.status(400).send({
      error: 'Project ID is Missing'
    })
  }

  let id = request.params.id

  projectModel
    .findById(id)
    .populate('owner')
    .then(document => {
      if (!document || document.length === 0) {
        return response.status(500).json(document)
      }

      response.status(200).json(document)
    })
    .catch(error => {
      response.status(500).json(error)
    })
})

router.delete('/:id', (request, response) => {
  if (!request.params.id) {
    return response.status(400).send({
      error: 'Project ID is Missing'
    })
  }

  let id = request.params.id

  projectModel
    .findByIdAndDelete(id)
    .then(document => {
      if (!document || document.length === 0) {
        return response.status(500).json(document)
      }

      response.status(200).json(document)
    })
    .catch(error => {
      response.status(500).json(error)
    })
})

module.exports = router
