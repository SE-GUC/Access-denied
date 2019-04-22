const skillsModel = require('../models/skills.model')
const express = require('express')
const router = express.Router()

const validator = require('../validations/skillsValidations')

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

  let model = new skillsModel(req.body)

  return model
    .save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(503).send(doc)
      }

      return res.status(201).send(doc)
    })
    .catch(err => {
      console.log(err)

      return res.status(501).send(err)
    })
})

router.get('/', (req, res) => {
  if (!req.query.id) {
    return res.status(400).send('id is mising.')
  }
  skillsModel
    .findOne({
      _id: req.query.id
    })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/all', (request, response) => {
  let key = {}

  skillsModel
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

router.put('/', (req, res) => {
  if (!req.query.id) {
    return res.status(400).send('id is mising.')
  }
  const isValidated = validator.updateValidation(req.body)
  if (isValidated.error)
    return res.status(400).send({ error: isValidated.error.details[0].message })
  skillsModel
    .findOneAndUpdate(
      {
        _id: req.query.id
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
  if (!req.query.id) {
    return res.status(400).send('id is mising.')
  }
  skillsModel
    .findOneAndDelete({
      _id: req.query.id
    })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports = router
