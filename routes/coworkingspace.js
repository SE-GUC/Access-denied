require('dotenv').config()
bodyParser = require('body-parser')
express = require('express')
const mongoose = require('mongoose')
const coworkingspaceModel = require('../models/coworkingspace.model')
const validator = require('../validations/coworkingspaceValidations.js')
const axios = require('axios')
const router = express.Router()
let baseURL = process.env.BASEURL || 'http://localhost:3000'

//TODO:check if its admin or not aka {request.query.token_id}
//if it's admin it will do its job
//if not it will make post request to this API
//sample code : if(request.query.token_id!=admin_token)
//axios.post(
// `http://localhost:3001/api/?token_id=${request.query.token_id}`,         //ref partner, members , users of the system
// {

//     route:`api/task`,
//     body: request.body,
//     type: "POST"},
//  )
// .then(q=>{
//   console.log(q.data)

//   response.send(q.data)
// })
// .catch(e=>{
//   response.send(e)
// })
// ) else "the rest of the code"
router.post('/', (req, res) => {
  const isValidated = validator.createValidation(req.body)
  if (isValidated.error)
    return res.status(400).send({ error: isValidated.error.details[0].message })
  axios
    .post(`${baseURL}/api/schedule`, {})
    .then(response => {
      let schedule = response.data._id
      req.body.schedule = schedule
      let model = new coworkingspaceModel(req.body)
      return model.save()
    })
    .then(doc => {
      if (!doc || doc.length === 0) {
        return res.status(500).send(doc)
      }
      res.status(201).send(doc)
    })
    .catch(err => {
      return res.status(500).json(err)
    })
})

router.get('/', (req, res) => {
  if (!req.query.id) return res.status(400).send('id is missing.')
  coworkingspaceModel
    .findOne({
      _id: req.query.id
    })
    .populate('schedule')
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

//TODO:check if its admin or not aka {request.query.token_id}
//if it's admin it will do its job
//if not it will make post request to this API
//sample code : if(request.query.token_id!=admin_token)
//axios.post(
// `http://localhost:3001/api/?token_id=${request.query.token_id}`,         //ref partner, members , users of the system
// {

//     route:`api/task`,
//     body: request.body,
//     type: "POST"},
//  )
// .then(q=>{
//   console.log(q.data)

//   response.send(q.data)
// })
// .catch(e=>{
//   response.send(e)
// })
// ) else "the rest of the code"
router.put('/', (req, res) => {
  if (!req.query.id) {
    return res.status(400).send('id is missing.')
  }
  const isValidated = validator.updateValidation(req.body)
  if (isValidated.error)
    return res.status(400).send({ error: isValidated.error.details[0].message })
  coworkingspaceModel
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
    return res.status(400).send('id is missing.')
  }
  coworkingspaceModel
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

router.post('/schedule', (req, res) => {
  if (!req || !req.body) {
    return res.status(400).send('Body Is Missing')
  }
  if (!req.query.id)
    return res.status(400).send('Coowrking Space Id Is Missing')
  let id = req.query.id
  coworkingspaceModel
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
  if (!req.query.id)
    return res.status(400).send('Coworking Space Id is Missing')
  let id = req.query.id
  coworkingspaceModel
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
  if (!req.query.id)
    return res.status(400).send('Coworking Space Id is Missing')
  if (!req.query.slot) return res.status(400).send('Slot Id Is Missing')
  let id = req.query.id
  coworkingspaceModel
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
  if (!req.query.id)
    return res.status(400).send('Coworking Space Id is Missing')
  if (!req.query.slot) return res.status(400).send('Slot Id Is Missing')
  let id = req.query.id
  coworkingspaceModel
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

router.get('/all', (req, res) => {
  coworkingspaceModel
    .find()
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports = router
