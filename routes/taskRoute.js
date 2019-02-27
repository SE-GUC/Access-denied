/**
 * @author: Omar I. Handouk
 * @exports: router
 * @description: This file handles all CRUD operations related to the Task Entity, it uses a simplfied schema (Non-Final) to project action to a cloud based MongoDB using the Mongoose ODM. The file exports a router for all the action to a default route '/', but all the CRUD route are actually posted to '/api/task/' route 
 */

'use strict'

const express = require('express')
const router = express.Router()

const Task = require('./../models/task.model')

/*
    POST/CREATE route for Task Entity
*/
router.post('/', (request, response) => {

    if (!request.body) {
        return response.status(400).send('400: Bad Request')
    }

    Task.create(request.body).then((document) => {

        if (!document || document.length == 0) {
            return response.status(500).send('500: Internal Server Error')
        }

        response.status(201).send(document)
    })
})

/*
    GET/READ route for Task Entity
    Either Get all the documents related to the Task Entity, or can be specified to fetch a certain document using 
*/