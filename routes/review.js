const reviewModel = require('../models/review.model')
const express = require('express')
const router = express.Router()
const axios = require('axios')
const validator = require('../validations/reviewValidations')
let baseURL = process.env.BASEURL || 'http://localhost:3000'

router.post('/', (req, res) => {
  if (!req.body) {
    return res.status(400).send('Body is missing')
  }

  const isValidated = validator.createValidation(req.body)
  if (isValidated.error)
    return res.status(400).send({ error: isValidated.error.details[0].message })
  const model = new reviewModel(req.body)
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
  if (!req.query.reviewee) {
    return res.status(400).send('Reviewee ID is missing.')
  }
  reviewModel
    .find({
      reviewee: req.query.reviewee
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

router.get('/all', (req, res) => {
  reviewModel
    .find({})
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.put('/', (req, res) => {
  if (!req.query.id) {
    return res.status(400).send('Review ID is missing.')
  }
  const isValidated = validator.updateValidation(req.body)
  if (isValidated.error)
    return res.status(400).send({ error: isValidated.error.details[0].message })
  reviewModel
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
    return res.status(400).send('Review ID is missing.')
  }
  reviewModel
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

router.post('/memberReview', (request, response) => {
  let requestAssigner = request.body.reviewee
  let requestAssignee = request.body.reviewer
  axios
    .get(`${baseURL}/api/task/Done`, {
      params: {
        assigner: requestAssigner,
        assignee: requestAssignee
      }
    })
    .then(doc => {
      if (!doc || doc.data.length === 0) {
        console.log('null')
        return response.status(500).send(doc)
      }
      const isValidated = validator.createValidation(request.body)
      if (isValidated.error)
        return response
          .status(400)
          .send({ error: isValidated.error.details[0].message })
      const model = new reviewModel(request.body)
      model
        .save()
        .then(document => {
          if (!document || document.length === 0) {
            return response.status(500).send(document)
          }
          response.status(201).send(document)
        })
        .catch(err => {
          response.status(500).json(err)
        })
    })
    .catch(err => {
      response.status(500).json(err)
    })
})

router.post('/partnerReview', (request, response) => {
  let requestAssigner = request.body.reviewer
  let requestAssignee = request.body.reviewee
  let post = false
  axios
    .get('http://localhost:3000/api/task/Done', {
      params: {
        assigner: requestAssigner,
        assignee: requestAssignee
      }
    })
    .then(doc => {
      if (!doc || doc.data.length === 0) {
        console.log('null')
        return response.status(500).send(doc)
      }
      const isValidated = validator.createValidation(request.body)
      if (isValidated.error)
        return response
          .status(400)
          .send({ error: isValidated.error.details[0].message })
      const model = new reviewModel(request.body)
      model
        .save()
        .then(document => {
          if (!document || document.length === 0) {
            return response.status(500).send(document)
          }
          response.status(201).send(document)
        })
        .catch(err => {
          response.status(500).json(err)
        })
    })
    .catch(err => {
      response.status(500).json(err)
    })
})

module.exports = router
