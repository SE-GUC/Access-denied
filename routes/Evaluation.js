const evaluations = require('../models/Evaluation.model')
const express = require('express')
const axios = require('axios')
const router = express.Router()

// for validation
const validator = require('../validations/EvaluationValidations')

const baseURL = process.env.BASEURL || 'http://localhost:3000'

// CREATE

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
      _id: req.query.id
    })
    .populate('certificate')
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

// UPDATE

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
    return res.status(400).send('evaluation id missing.')
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

// DELETE
router.delete('/', (req, res) => {
  if (!req.query.id) {
    return res.status(400).send('evaluation id is missing')
  }
  evaluations
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

// Book Offline Evaluation.

router.put('/book/offline', (request, res) => {
  let scheduleID = request.query.scheduleID

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
      res.json(doc.data)
    })
    .catch(error => {
      console.log(error)
    })
})

module.exports = router
