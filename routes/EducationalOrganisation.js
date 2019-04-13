const educationalorganisations = require('../models/EducationalOrganisation.model')
const express = require('express')
const router = express.Router()
const validator = require('../validations/EducationalOrganisationValidations.js')

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
  let model = new educationalorganisations(req.body)
  model
    .save()
    .then(doc => {
      if (!doc || doc.length == 0) {
        return res.status(500).send(doc)
      }
      res.status(201).send(doc) //TODO
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/', (req, res) => {
  if (!req.query.email) {
    return res.status(400).send('Missing')
  }
  educationalorganisations
    .findOne({
      email: req.query.email
    })
    .populate('certificate')
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.get('/all', (request, response) => {
  let key = {}

  educationalorganisations
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
  if (!req.query.email) {
    return res.status(400).send('Educational Organisation email is missing.')
  }
  const isValidated = validator.updateValidation(req.body)
  if (isValidated.error)
    return res.status(400).send({ error: isValidated.error.details[0].message })
  educationalorganisations
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
    return res.status(400).send('Educational Organisation email is missing.')
  }
  educationalorganisations
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

module.exports = router
