const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const validator = require('../validations/userValidations')
const axios = require('axios')
const _ = require('lodash')
const baseURL = process.env.BASEURL || 'http://localhost:3000'

router.post('/', (req, res) => {
  const isValidated = validator.createValidation(
    _.pick(req.body, ['email', 'password', 'type', 'profile'])
  )
  if (isValidated.error) {
    return response.status(400).send({
      error: isValidated.error.details[0].message
    })
  }
  let url = ''
  let body = {}
  switch (req.body.type) {
    case 'Members':
      url = baseURL + '/api/member'
      body = _.pick(req.body, [
        'name',
        'certification',
        'calendar',
        'birthDate',
        'address',
        'payRate',
        'expiryDate'
      ])
      break
    case 'ConsultancyAgencies':
      url = baseURL + '/api/consultancy'
      body = _.pick(req.body, [
        'name',
        'phoneNumber',
        'address',
        'partners',
        'boardMembers',
        'events',
        'reports'
      ])
      break
    case 'Partners':
      url = baseURL + '/api/partner'
      body = _.pick(req.body, [
        'name',
        'Telephone_number',
        'other',
        'address',
        'number_of_employees',
        'field_of_work',
        'other_partners',
        'members',
        'events'
      ])
      break
    case 'CoworkingSpaces':
      url = baseURL + '/api/coworking'
      body = _.pick(req.body, [
        'name',
        'address',
        'phoneNumber',
        'workingHours',
        'description',
        'schedule',
        'noOfRooms'
      ])
      break
    case 'EducationalOrganisation':
      url = baseURL + '/api/EducationalOrganisation'
      body = _.pick(req.body, [
        'name',
        'address',
        'contactInformation',
        'vision',
        'mission',
        'partners',
        'information',
        'course',
        'certificate',
        'trainer',
        'trainingProgram'
      ])
      break
    default:
      return res.status(400).send('Data not valid')
  }
  axios
    .post(url, body)
    .then(response => {
      let body = _.pick(req.body, ['email', 'password', 'type'])
      body.profile = response.data._id
      return new User(body).save()
    })
    .then(doc => {
      if (!doc || doc.length === 0) return res.status(500).send(doc)
      return res.json(_.pick(doc, ['email', 'type', 'profile', '_id']))
    })
    .catch(err => {
      res.status(500).send('Error')
    })
})

router.post('/', (req, res) => {
  const isValidated = validator.createValidation(
    _.pick(req.body, ['email', 'password', 'type', 'profile'])
  )
  if (isValidated.error) {
    return response.status(400).send({
      error: isValidated.error.details[0].message
    })
  }
  let url = ''
  let body = {}
  switch (req.body.type) {
    case 'Members':
      url = baseURL + '/api/member'
      body = _.pick(req.body, [
        'name',
        'certification',
        'calendar',
        'birthDate',
        'address',
        'payRate',
        'expiryDate'
      ])
      break
    case 'ConsultancyAgencies':
      url = baseURL + '/api/consultancy'
      body = _.pick(req.body, [
        'name',
        'phoneNumber',
        'address',
        'partners',
        'boardMembers',
        'events',
        'reports'
      ])
      break
    case 'Partners':
      url = baseURL + '/api/partner'
      body = _.pick(req.body, [
        'name',
        'Telephone_number',
        'other',
        'address',
        'number_of_employees',
        'field_of_work',
        'other_partners',
        'members',
        'events'
      ])
      break
    case 'CoworkingSpaces':
      url = baseURL + '/api/coworking'
      body = _.pick(req.body, [
        'name',
        'address',
        'phoneNumber',
        'workingHours',
        'description',
        'schedule',
        'noOfRooms'
      ])
      break
    case 'EducationalOrganisation':
      url = baseURL + '/api/EducationalOrganisation'
      body = _.pick(req.body, [
        'name',
        'address',
        'contactInformation',
        'vision',
        'mission',
        'partners',
        'information',
        'course',
        'certificate',
        'trainer',
        'trainingProgram'
      ])
      break
    default:
      return res.status(400).send('Data not valid')
  }
  axios
    .post(url, body)
    .then(response => {
      let body = _.pick(req.body, ['email', 'password', 'type'])
      body.profile = response.data._id
      return new User(body).save()
    })
    .then(doc => {
      if (!doc || doc.length === 0) return res.status(500).send(doc)
      return res.json(_.pick(doc, ['email', 'type', 'profile', '_id']))
    })
    .catch(err => {
      res.status(500).send('Error')
    })
})
router.get('/', (req, res) => {
  // Only admins should be able to get user info
  if (!req.query.email) {
    return res.status(400).send('Email is missing.')
  }
  User.findOne({
    email: req.query.email
  })
    .select('-password')
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})

router.put('/', (req, res) => {
  if (!req.query.email) {
    return res.status(400).send('Email is missing.')
  }
  const isValidated = validator.updateValidation(req.body)
  if (isValidated.error)
    return res.status(400).send({ error: isValidated.error.details[0].message })
  User.findOneAndUpdate(
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
    return res.status(400).send('Email is mising.')
  }
  User.findOneAndDelete({
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
