const consultancyModel = require('../models/consultancy.model')
const Task = require('../models/task.model')
const express = require('express')
const router = express.Router()
const axios = require('axios')
const validator = require('../validations/consultancyValidations')
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
  if (!req.query.id) {
    return res.status(400).send('id is missing.')
  }
  consultancyModel
    .findById(req.query.id)
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
  consultancyModel
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
  consultancyModel
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

router.post('/applyontask', (req, res) => {
  if (!req.query.id) return res.status(400).send('Task id is missing')
  if (!req.body.id) return res.status(400).send('Consultancy id is missing')
  if (!req.body.plan) return res.status(400).send('Plan is missing.')
  Task.findById(req.query.id)
    .then(doc => {
      if (!doc || doc.phase !== 'Looking for ConsultancyAgencies')
        return res.status(400).send('Not eligible for the task')
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
    .catch(err => {
      res.status(500).json(err)
    })
})

module.exports = router
