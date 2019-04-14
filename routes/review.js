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
router.post('/newPost', (req, res) => {
  //const isValidated = validator.createValidation(req.body)
  //if (isValidated.error) {
  //  return res.status(500).send('Validation')
  //}
  let requestAssigner = req.body.reviewee
  let verify = req.app.get('verifyToken')
  let ver = verify(req.body.token)
  if (!ver) return res.status(500).send('Error')
  let requestAssignee = ver.profile
  let id = req.body.task
  axios
    .get(`${baseURL}/api/task/isTaskDone`, {
      params: {
        owner: requestAssigner,
        assignee: requestAssignee,
        taskID: id
      }
    })
    .then(doc => {
      let checker = doc.data.length === 0
      if (checker) {
        return res.status(500).send('Incorrect data')
      } else {
        const model = new reviewModel(req.body)
        model
          .save()
          .then(doc => {
            res.status(201).send(doc)
          })
          .catch(err => {
            return res.status(500).send()
          })
      }
    })
    .catch(err => {
      return res.status(500).send('incorrect Data')
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
    .populate('task')
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

router.post('/partnerReview', (req, res) => {
  let verify = req.app.get('verifyToken')
  let ver = verify(req.body.token)
  if (!ver) return res.status(500).send('Error')
  let requestAssigner = ver.profile
  let requestAssignee = req.body.reviewee
  axios
    .get(`${baseURL}/api/task/Done`, {
      params: {
        assigner: requestAssigner,
        assignee: requestAssignee,
        taskID: req.body.task
      }
    })
    .then(doc => {
      if (!doc || doc.data.length === 0) {
        console.log('null')
        return res.status(500).send(doc)
      }
      const isValidated = validator.createValidation(req.body)
      if (isValidated.error)
        return res
          .status(400)
          .send({ error: isValidated.error.details[0].message })
      const model = new reviewModel(req.body)
      model
        .save()
        .then(document => {
          if (!document || document.length === 0) {
            return res.status(500).send(document)
          }
          res.status(201).send(document)
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
