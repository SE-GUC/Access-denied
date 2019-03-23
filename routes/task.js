/**
 * @author: Omar I. Handouk
 * @exports: router
 * @description: This file handles all CRUD operations related to the Task Entity, it uses a simplfied schema (Non-Final) to project action to a cloud based MongoDB using the Mongoose ODM. The file exports a router for all the action to a default route '/', but all the CRUD route are actually posted to '/api/task/' route 
 */

"use strict";

const express = require('express')
const router = express.Router()

const Task = require('../models/task.model')
const validator = require('../validations/taskValidations')
const axios = require("axios")
const mongoose=require("mongoose");
mongoose.set('useCreateIndex',true);
mongoose.set('usefindandmodify',false);

/*
    POST/CREATE route for Task Entity
*/
router.post('/', (request, response) => {

    if (!request.body) {
        return response.status(400).send('400: Bad Request')
    }

    const isValidated = validator.createValidation(request.body)
    if (isValidated.error) return response.status(400).send({ error: isValidated.error.details[0].message })

    Task.create(request.body).then((document) => {

        if (!document || document.length == 0) {
            return response.status(500).json(document)
        }

        response.status(201).json(document)

    }).catch((error) => {
        response.status(500).json(error)
    })
})


/*
    GET/READ route for Task Entity
    Either Get all the documents related to the Task Entity, or can be specified to fetch a certain document using 
*/

router.get('/', (request, response) => {

    let email = request.query.contactEmail

    if (!email) {
        return response.status(400).status('400: Bad Request, no email is supplied')
    }

    let key = {
        'contactEmail': email
    }

    Task.findOne(key).then((document) => {

        if (!document || document.length == 0) {
            return response.status(500).json(document)
        }

        response.status(200).json(document)

    }).catch((error) => {
        response.status(500).json(error)
    })
})

router.get('/Done', (request, response) => {

    let assigner= request.query.assigner
    let assignee= request.query.assignee

    if (!assigner || !assignee) {
        return response.status(400).status('No assigner or assignee supplied')
    }

    let key = {
        'assigner': assigner,
        'assignee': assignee,
        'isCompleted': true
        
    }

    Task.find(key).then((document) => {
        response.status(200).json(document)
    }).catch((error) => {
        response.status(500).json(error)
    })
})
router.get('/all', (request, response) => {

    let key = {}

    Task.find(key).then((document) => {

        if (!document || document.length == 0) {
            return response.status(500).json(document)
        }

        response.status(200).json(document)

    }).catch((error) => {
        response.status(500).json(error)
    })
})


/*
    PUT/UPDATE route for Task Entity
*/

router.put('/', (request, response) => {

    let email = request.query.contactEmail

    if (!email) {
        return response.status(400).status('400: Bad Request, no email is supplied')
    }

    const isValidated = validator.updateValidation(request.body)
    if (isValidated.error) return response.status(400).send({ error: isValidated.error.details[0].message })
    
    let key = {
        'contactEmail': email
    }

    let updatedDocument = request.body

    Task.findOneAndUpdate(key, updatedDocument, {
        'new': true
    }).then((document) => {

        if (!document || document.length == 0) {
            return response.status(500).json(document)
        }

        response.status(200).json(document)

    }).catch((error) => {
        response.status(500).json(error)
    })
})

router.delete('/', (request, response) => {

    let email = request.query.contactEmail

    if (!email) {
        return response.status(400).status('400: Bad Request, no email is supplied')
    }

    let key = {
        'contactEmail': email
    }

    Task.findOneAndDelete(key).then((document) => {

        if (!document || document.length == 0) {
            return response.status(500).json(document)
        }

        response.status(200).json(document)

    }).catch((error) => {
        response.status(500).json(error)
    })
})

router.get('/filterTasks', (request, response) => {
    var skills = request.query.skills
    var q =JSON.parse(skills)
    if (! q) {
        return response.status(400).status('400: Bad Request')
    }
    var splitted = q.skills.split(",")
    var  tasks=[]
    axios.get("http://localhost:3000/api/task/all")
    .then(alltasks =>{
    splitted.forEach(function(element) {
        alltasks.data.forEach(function(element2) {
               element2.skills.forEach(function(skill){
                   let j =tasks.find(function(ele){
                        return element2==ele
                   })
                   if(element==skill && j==null){
                    // response.json(element2.data)
                    tasks.push(element2)
                   }
               })
               
               })})
               response.json(tasks) 
            })
            .catch((error) => {
                response.status(500).json(error)
            })
       
    
})
module.exports = router;