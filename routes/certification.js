'use strict'
const certificationModel = require('../models/certification.model')
const express = require('express')
const router = express.Router()
const validator = require('../validations/certificationValidations.js')
const axios = require('axios')
var baseURL = process.env.BASEURL || 'http://localhost:3000'

router.post('/', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Body is missing')
  }
  const isValidated = validator.createValidation(req.body)
  if (isValidated.error)
    return res.status(400).send({ error: isValidated.error.details[0].message })
  let model = new certificationModel(req.body)

  model
    .save()
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }

      res.status(200).send(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})
router.get('/all', (_request, response) => {
  let key = {}

  certificationModel
    .find(key)
    .then(document => {
      if (!document || document.length == 0) {
        return response.status(500).json(document)
      }

      response.status(200).json(document)
    })
    .catch(error => {
      response.status(500).json(error)
    })
})
router.get('/all', (request, response) => {

    let key = {}
    //let model = new certificationModel(req.body)
    //model.save()

    certificationModel.find(key).then((document) => {

        if (!document || document.length == 0) {
            return response.status(500).json(document)
        }

        response.status(200).json(document)

    }).catch((error) => {
        response.status(500).json(error)
    })
})

router.put('/', (req, res) => {
  if (!req.query.name) {
    return res.status(400).send('name of certification is missing.')
  }
  const isValidated = validator.updateValidation(req.body)
  if (isValidated.error)
    return res.status(400).send({ error: isValidated.error.details[0].message })
  certificationModel
    .findOneAndUpdate(
      {
        name: req.query.name
      },
      req.body,
      {
        new: true,
        useFindAndModify: false
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
  if (!req.query.name) {
    return res.status(400).send('name is missing.')
  }
  certificationModel
    .findOneAndDelete({
      name: req.query.name
    })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/', (req, res) => {
  if (!req.query.name) {
    return res.status(400).send('name of certification is missing.')
  }
  certificationModel
    .find({
      name: req.query.name
    })
    .populate('schedule')
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.post('/offlineEvaluation/', (req, res) => {
  if (!req || !req.body) {
    return res.status(400).send('Body is Missing')
  }
  if (!req.query.id) {
    return res.status(400).send('Certificate id is Missing')
  }
  axios
    .post(`${baseURL}/api/schedule`, {})
    .then(response => {
      console.log(response.data._id)
      let schedule = response.data._id
      req.body.schedule = schedule
      return certificationModel.findByIdAndUpdate(req.query.id, {
        schedule: response.data._id
      })
    })
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }
      res.status(201).send(doc)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.post('/schedule', (req, res) => {
  if (!req || !req.body) {
    return res.status(400).send('Body Is Missing')
  }
  if (!req.query.id) return res.status(400).send('Certificate Id Is Missing')
  let id = req.query.id
  certificationModel
    .findById(id)
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }
      let scheduleId = doc.schedule
      res.redirect(307, `../schedule/${scheduleId}/slot`)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/schedule', (req, res) => {
  if (!req || !req.body) {
    return res.status(400).send('Body Is Missing')
  }
  if (!req.query.id) return res.status(400).send('Certificate Id Is Missing')
  let id = req.query.id
  certificationModel
    .findById(id)
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }
      let scheduleId = doc.schedule
      if (!req.query.slot) {
        res.redirect(307, `../schedule/${scheduleId}`)
      } else {
        res.redirect(307, `../schedule/${scheduleId}/slot?id=${req.query.slot}`)
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.put('/schedule', (req, res) => {
  if (!req || !req.body) {
    return res.status(400).send('Body Is Missing')
  }
  if (!req.query.id) return res.status(400).send('Certificate Id Is Missing')
  if (!req.query.slot) return res.status(400).send('Slot Id Is Missing')
  let id = req.query.id
  certificationModel
    .findById(id)
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }
      let scheduleId = doc.schedule
      res.redirect(307, `../schedule/${scheduleId}/slot?id=${req.query.slot}`)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})
router.delete('/schedule', (req, res) => {
  if (!req || !req.body) {
    return res.status(400).send('Body Is Missing')
  }
  if (!req.query.id) return res.status(400).send('Certificate Id Is Missing')
  if (!req.query.slot) return res.status(400).send('Slot Id Is Missing')
  let id = req.query.id
  certificationModel
    .findById(id)
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }
      let scheduleId = doc.schedule
      res.redirect(307, `../schedule/${scheduleId}/slot?id=${req.query.slot}`)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})
module.exports = router
