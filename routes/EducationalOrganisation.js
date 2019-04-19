const educationalorganisations = require('../models/educationalOrganisation.model')
const express = require('express')
const router = express.Router()
const validator = require('../validations/EducationalOrganisationValidations.js')
const axios = require("axios");
const _ = require('lodash');
const baseURL = process.env.BASEURL || 'http://localhost:3000'

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
  if (!req.query.id) {
    return res.status(400).send('Missing')
  }
  educationalorganisations
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
  if (!req.query.id) {
    return res.status(400).send('Educational Organisation id is missing.')
  }
  const isValidated = validator.updateValidation(req.body)
  if (isValidated.error)
    return res.status(400).send({ error: isValidated.error.details[0].message })
  educationalorganisations
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
    return res.status(400).send('Educational Organisation id is missing.')
  }
  educationalorganisations
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

router.put('/newCertification',(req, res) => {
  
  if(!req.body.token)
    return res.status(400).send('body is missing')
  const verify = req.app.get('verifyToken')
  const data = verify(req.body.token)
  let url = ''
  
  if(!data)
    return res.status(500).send('there was no data from token')
  if(data.type !== 'EducationalOrganisation')
    return res.status(400).send('not allowed to create a new certification')
  let  certificationBody = _.pick(req.body, [
      'name',
      'skills',
      'Fees',
      'Method_of_payment',
      'keywords'
    ])   
 url = baseURL + '/api/certification' 
 let createdCertification=axios.post(url, certificationBody);
 createdCertification.then(function(result) {
  
    createdCertificationId=result.data._id
    let newData={
      //how to add to the array of certificates
     "certificate":[createdCertificationId]
    }
   axios.put(baseURL+'/api/EducationalOrganisation?id='+[data.profile],newData) 
    
})


})

module.exports = router
