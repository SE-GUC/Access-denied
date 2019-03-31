/**
 * @author: Omar I. Handouk
 * @exports: router
 * @description: This file handles all CRUD operations related to the Task Entity, it uses a simplfied schema (Non-Final) to project action to a cloud based MongoDB using the Mongoose ODM. The file exports a router for all the action to a default route '/', but all the CRUD route are actually posted to '/api/task/' route
 */

'use strict'

const express = require('express')
const router = express.Router()

const Task = require('../models/task.model')
const validator = require('../validations/taskValidations')
const axios = require('axios')

const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
mongoose.set('usefindandmodify', false)

const baseURL = process.env.BASEURL || 'http://localhost:3000'

/*
    POST/CREATE route for Task Entity
*/

/**
 * @description Create a new document in Tasks Collection
 * @returns Success/Error JSON
 */
router.post('/', (request, response) => {
  if (!request.body) {
    return response.status(400).send('400: Bad Request')
  }

  const isValidated = validator.createValidation(request.body)

  if (isValidated.error) {
    return response.status(400).send({
      error: isValidated.error.details[0].message
    })
  }

  Task.create(request.body)
    .then(document => {
      if (!document || document.length === 0) {
        return response.status(500).json(document)
      }

      response.status(201).json(document)
    })
    .catch(error => {
      response.status(500).json(error)
    })
})

/*
    GET/READ route for Task Entity
    Either Get all the documents related to the Task Entity, or can be specified to fetch a certain document using 
*/

/**
 * @description Get Document in Database
 * @returns Success/Error JSON
 * @requires _id
 */

router.get('/', (request, response) => {
  let documentID = request.query.id

  if (!documentID) {
    return response
      .status(400)
      .status('400: Bad Request, no document ID is supplied')
  }

  let key = {
    _id: documentID
  }

  Task.findOne(key)
    .then(document => {
      if (!document || document.length == 0) {
        return response.status(500).json(document)
      }
      response.status(200).json(document)
      
    })
    .catch(error => {
      response.status(500).json(error)
    })
})

router.get('/all', (request, response) => {
  let key = {}

  Task.find(key)
    .then(document => {
      if (!document || document.length == 0) {
        return response.status(500).json(document)
      }

      response.status(200).json(document)
    })
    .catch(error => {
      response.status(500).json(error)
    })
})

/*
    PUT/UPDATE route for Task Entity
*/

/**
 * @description Update Document in Database
 * @requires _id
 */

router.put('/', (request, response) => {
  let documentID = request.query.id

  if (!documentID) {
    return response
      .status(400)
      .status('400: Bad Request, no document ID is supplied')
  }

  const isValidated = validator.updateValidation(request.body)

  if (isValidated.error) {
    return response.status(400).send({
      error: isValidated.error.details[0].message
    })
  }

  let key = {
    _id: documentID
  }

  let updatedDocument = request.body

  Task.findOneAndUpdate(key, updatedDocument, {
    new: true
  })
    .then(document => {
      if (!document || document.length == 0) {
        return response.status(500).json(document)
      }

      response.status(200).json(document)
    })
    .catch(error => {
      response.status(500).json(error)
    })
})

/**
 * @description Delete a document from Database
 * @requires _id
 * @returns Success/Error JSON
 */

router.delete('/', (request, response) => {
  let documentID = request.query.id

  if (!documentID) {
    return response
      .status(400)
      .status('400: Bad Request, no document ID is supplied')
  }

  let key = {
    _id: documentID
  }

  Task.findOneAndDelete(key)
    .then(document => {
      if (!document || document.length == 0) {
        return response.status(500).json(document)
      }

      response.status(200).json(document)
    })
    .catch(error => {
      response.status(500).json(error)
    })
})


const search =function search(skills,alltasks){
  let tasks = []
  skills.forEach(function(element) {
    alltasks.data.forEach(function(element2) {
      element2.skills.forEach(function(skill) {
        let j = tasks.find(function(ele) {
          return element2 == ele
        })
        if (element == skill && j == null && element2.isComplete == false) {
          tasks.push(element2)
        }
      })
    })
  })
  return tasks
}
/**
 * @description Filter Tasks
 * @requires skills
 * @returns Filtered Document
 */
router.get('/filterTasks', (request, response) => {
  let skills = request.query.skills
  let q = JSON.parse(skills)
  if (!q) {
    return response.status(400).status('400: Bad Request')
  }
  let splitted = q.skills.split(',')

  axios
    .get(`${baseURL}/api/task/all`)

    .then(alltasks => {
      let result = search(splitted,alltasks)
     return response.json(result)
    })
    .catch(error => {
      return response.send(error)
    })
})

/**
 * @description Update Task Status to be done
 * @requires id
 * @returns Updated Document
 */

router.put('/:id/done', (request, response) => {
  let documentID = request.params.id

  if (!documentID) {
    return response
      .status(400)
      .status('400: Bad Request, no document ID is supplied')
  }

  let key = {
    _id: documentID
  }

  Task.findOneAndUpdate(
    key,
    {
      isComplete: true
    },
    {
      new: true
    }
  )
    .then(document => {
      if (!document || document.length == 0) {
        return response.status(500).json(document)
      }

      response.status(200).json(document)
    })
    .catch(error => {
      response.status(500).json(error)
    })
})

module.exports = {"router": router,
                  "searchTasksBySkills":search}

