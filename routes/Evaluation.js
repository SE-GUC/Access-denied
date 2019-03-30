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

//READ
router.get("/",(req,res)=>{
    if(!req.query){
        return res.status(400).send("Missing")
    }
    evaluations.findOne({
     _id:req.query.id})
     .populate('EducationalOrganisation')
     .populate('certificate')
    .then((doc)=>{
        res.json(doc)
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

<<<<<<< Updated upstream
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
=======
//UPDATE
router.put("/", (req, res) => {
    if (!req.query.id) {
        return res.status(400).send('Evaluation ID is missing.')
      }
      const isValidated = validator.updateValidation(req.body)
      if (isValidated.error)
        return res.status(400).send({ error: isValidated.error.details[0].message })
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
        .catch((err) => {
            res.status(500).json(err)
        })
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
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
=======
//DELETE
router.delete("/", (req, res) => {
    if (!req.query.id) {
        return res.status(400).send('evaluation ID is missing.')
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
>>>>>>> Stashed changes
})

module.exports = router
