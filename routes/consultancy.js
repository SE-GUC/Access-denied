const consultancyModel = require('../models/consultancy.model')
const express = require('express')
const router = express.Router()
const axios = require('axios')
const validator = require('../validations/consultancyValidations')
let baseURL = process.env.BASEURL || 'http://localhost:3000'

router.post('/', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Body is missing')
  }

  const isValidated = validator.createValidation(req.body)
  if (isValidated.error)
    return res.status(400).send({ error: isValidated.error.details[0].message })
  let model = new consultancyModel(req.body)
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
  if (!req.query.email) {
    return res.status(400).send('Email is missing.')
  }
  consultancyModel
    .findOne({
      email: req.query.email
    })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/all', (req, res) => {
  consultancyModel
    .find({})
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.put('/', (req, res) => {
  if (!req.query.email) {
    return res.status(400).send('Email is missing.')
  }
  const isValidated = validator.updateValidation(req.body)
  if (isValidated.error)
    return res.status(400).send({ error: isValidated.error.details[0].message })
  consultancyModel
    .findOneAndUpdate(
      {
        email: req.query.email
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

router.delete('/', (req, res) => {
  if (!req.query.email) {
    return res.status(400).send('Email is missing.')
  }
  consultancyModel
    .findOneAndDelete({
      email: req.query.email
    })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.post('/applyontask', (req, res) => {
  if (!req.query.id) return res.status(400).send('Task id is missing')
  if (!req.body.id) return res.status(400).send('Consultancy id is missing')
  if (!req.body.plan) return res.status(400).send('Plan is missing.')
  axios
    .post(`${baseURL}/api/application`, {
      task: req.query.id,
      applier: req.body.id,
      details: req.body.plan,
      applierModel: 'ConsultancyAgencies'
    })
    .then(response => {
      let doc = response.data
      if (!doc || doc.length === 0) return res.status(500).send(doc)
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports = router
