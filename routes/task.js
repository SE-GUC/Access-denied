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
const fetch = require('node-fetch')

mongoose.set('useCreateIndex', true)
mongoose.set('usefindandmodify', false)

const baseURL = process.env.BASEURL || 'http://localhost:3001'

/*
    POST/CREATE route for Task Entity
*/

/**
 * @description Create a new document in Tasks Collection
 * @returns Success/Error JSON
 */

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
      console.log(error)
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
  .populate('owner')
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

router.get('/all', (request, response) => {
  let key = {}

  Task.find(key)
  // .populate('owner')
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
router.get('/isTaskDone', (request, response) => {
  let reqowner = request.query.owner
  let reqassignee = request.query.assignee
  let reqid = request.query.taskID
  if (!reqowner || !reqassignee || !reqid) {
    return response.send()
  }
  let key = {
    owner: reqowner,
    assignee: reqassignee,
    _id: reqid,
    isComplete: true
  }
  Task.findOne(key)
  .populate('owner')    
    .then(document => {
      response.json(document)
    })
    .catch(error => {
      response.send()
    })
})

/*
    PUT/UPDATE route for Task Entity
*/

/**
 * @description Update Document in Database
 * @requires id
 */

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

      response.json(document)
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

      response.json(document)
    })
    .catch(error => {
      response.status(500).json(error)
    })
})

const search = function search(skills, alltasks) {
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
      let result = search(splitted, alltasks)
      return response.json(result)
    })
    .catch(error => {
      return response.send(error.response.data)
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

      response.json(document)
    })
    .catch(error => {
      response.status(500).json(error)
    })
})

module.exports = {
  router: router,
  searchTasksBySkills: search
}
