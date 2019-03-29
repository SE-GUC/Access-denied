const evaluations = require('../models/Evaluation.model')
const express = require('express')
const axios = require('axios')
const router = express.Router()

// for validation
const validator = require('../validations/EvaluationValidations')

const baseURL = process.env.BASEURL || 'http://localhost:3000'

// CREATE
router.post('/', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Body is missing')
  }
  const isValidated = validator.createValidation(req.body)

  if (isValidated.error) {
    return res.status(400).send({
      error: isValidated.error.details[0].message
    })
  }

  let model = new evaluations(req.body)

  model
    .save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }
      res.status(201).send(doc) // TODO
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// READ
router.get('/', (req, res) => {
  if (!req.query) {
    return res.status(400).send('Missing')
  }
  evaluations
    .findOne({
      evaluationCode: req.query.evaluationCode
    })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// UPDATE
router.put('/', (req, res) => {
  if (!req.query.evaluationCode) {
    return res.status(400).send('evaluation code missing.')
  }
  const isValidated = validator.updateValidation(req.body)

  if (isValidated.error) {
    return res.status(400).send({
      error: isValidated.error.details[0].message
    })
  }

  evaluations
    .findOneAndUpdate(
      {
        evaluationCode: req.query.evaluationCode
      },
      req.body,
      {
        new: true
      }
    )
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// DELETE
router.delete('/', (req, res) => {
  if (!req.query.evaluationCode) {
    return res.status(400).send('evaluation code is missing')
  }
  evaluations
    .findOneAndDelete({
      evaluationCode: req.query.evaluationCode
    })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// Book Offline Evaluation.

router.put('/book/offline', (request, res) => {
  let scheduleID = request.query.scheduleID

  console.log(baseURL + '/' + scheduleID + '/slot')

  axios({
    method: 'post',
    url: baseURL + '/api/schedule/' + scheduleID + '/slot',
    data: {
      from: request.body.from,
      to: request.body.to,
      available: request.body.available,
      assignedTo: request.body.assignedTo,
      day: request.body.day
    }
  })
    .then(doc => {
      res.status(200).send(doc.data)
    })
    .catch(error => {
      console.log(error)
    })
})

module.exports = router
