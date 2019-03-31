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

const baseURL = process.env.BASEURL || 'localhost:3000'

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
router.get("/isTaskDone", (request, response) => {
  let reqowner = request.query.owner;
  let reqassignee = request.query.assignee;
  let reqid = request.query.taskID;
  if (!reqowner || !reqassignee || !reqid) {
    return response.send();
  }
  let key = {
    owner: reqowner,
    assignee: reqassignee,
    _id: reqid,
    isComplete: true
  };
  Task.findOne(key)
    .then(document => {
      response.status(200).json(document);
    })
    .catch(error => {
      response.send();
    });
});


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

/**
 * @description Filter Tasks
 * @requires skills
 * @returns Filtered Document
 */

router.get('/filterTasks', (request, response) => {
  var skills = request.query.skills
  var q = JSON.parse(skills)
  if (!q) {
    return response.status(400).status('400: Bad Request')
  }
  var splitted = q.skills.split(',')
  var tasks = []

  axios
    .get(`${baseURL}/api/task/all`)

    .then(alltasks => {
      splitted.forEach(function(element) {
        alltasks.data.forEach(function(element2) {
          element2.skills.forEach(function(skill) {
            let j = tasks.find(function(ele) {
              return element2 == ele
            })
            if (element == skill && j == null) {
              // response.json(element2.data)
              tasks.push(element2)
            }
          })
        })
      })
      response.json(tasks)
    })
    .catch(error => {
      response.status(500).json(error)
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

module.exports = router
