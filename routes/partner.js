const partnerModel = require('../models/partner.model')
const express = require('express')
const router = express.Router()
const validator = require('../validations/partnerValidations')
const axios = require('axios')
const reviewModel = require('../models/review.model')
const baseURL = process.env.BASEURL || 'http://localhost:3001'

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
  // const isValidated = validator.createValidation(req.body)
  // if (isValidated.error){
  //   console.log("why")
  //   return res.status(400).send(isValidated.error)}

  let model = new partnerModel(req.body)

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
  partnerModel
    .findOne({
      _id: req.query.id
    })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})

router.get('/search', (req, res) => {
  if (!req.query.field_of_work) {
    return res.status(400).send('field_of_work is mising.')
  }
  partnerModel
    .find({
      field_of_work: req.query.field_of_work
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

  partnerModel
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
    return res.status(400).send('id is mising.')
  }
  // const isValidated = validator.updateValidation(req.body)
  // if (isValidated.error)
  //   return res.status(400).send({ error: isValidated.error.details[0].message })
  partnerModel
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

router.put('/review', (req, res) => {
  if (!req.query.id && !req.query.name) {
    return res.status(400).send('id is mising.')
  }
  const isValidated = validator.updateValidation(req.body)
  if (isValidated.error)
    return res.status(400).send({ error: isValidated.error.details[0].message })
  partnerModel
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
      res.status(501).send(err)
    })
})

router.delete('/', (req, res) => {
  if (!req.query.id) {
    return res.status(400).send('id is mising.')
  }
  partnerModel
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

router.get('/getFeedback', (req, res) => {
  if (!req.query.id) {
    return res.status(400).send('Reviewee ID is missing.')
  }
  reviewModel
    .find({
      reviewee: req.query.id
    })
    .populate('reviewer', 'name')
    .populate('reviewee', 'name')
    .populate('task', 'name')
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})
router.put('/chooseAssignee', (req, res) => {
  let taskID=req.query.id
  if (!taskID) {
    return res.send('No task provided')
  }
  axios
  .put(`${baseURL}/api/task/chooseAssignee?id=${taskID}`, {
    assignee:req.body.assignee
  })
  .then(doc => {
    if (!doc || doc.data.length === 0) {
      return res.send(doc)
    }
    res.status(201).json(doc.data)
  })
  .catch(err => {
    res.send("err")
  })
})

module.exports = router
