const applicationModel = require('../models/application.model')
const express = require('express')
const router = express.Router()
const validator = require('../validations/applicationValidations')

router.post('/', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Body is missing')
  }

  const isValidated = validator.createValidation(req.body)
  if (isValidated.error)
    return res.status(400).send({ error: isValidated.error.details[0].message })
  const model = new applicationModel(req.body)
  model
    .save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }

      res.status(201).send(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/', (req, res) => {
  if (!req.query.id) {
    return res.status(400).send('Application ID is missing.')
  }
  applicationModel
    .findById(req.query.id)
    .populate('applier', 'name')
    .populate('task', 'name')
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.put('/', (req, res) => {
  if (!req.query.id) {
    return res.status(400).send('Application ID is missing.')
  }
  const isValidated = validator.updateValidation(req.body)
  if (isValidated.error)
    return res.status(400).send({ error: isValidated.error.details[0].message })
  applicationModel
    .findByIdAndUpdate(req.query.id, req.body, {
      new: true
    })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.delete('/', (req, res) => {
  if (!req.query.id) {
    return res.status(400).send('Application ID is missing.')
  }
  applicationModel
    .findByIdAndDelete(req.query.id)
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/all', (request, response) => {
  let key = {}

  applicationModel
    .find(key)
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
module.exports = router
