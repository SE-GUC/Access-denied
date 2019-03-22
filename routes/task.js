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

/*
    POST/CREATE route for Task Entity
*/
router.post('/', (request, response) => {

    if (!request.body) {
        return response.status(400).send('400: Bad Request')
    }

    //const isValidated = validator.createValidation(req.body)
    //if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })

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

    Task.findOne(key).populate('assigner').populate('assignee').then((document) => {

        if (!document || document.length == 0) {
            return response.status(500).json(document)
        }

        response.status(200).json(document)

    }).catch((error) => {
        response.status(500).json(error)
    })
})

router.get('/all', (request, response) => {

    let key = {}

    Task.find(key).populate('assigner').populate('assignee').then((document) => {

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

    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) return res.status(400).send({
        error: isValidated.error.details[0].message
    })

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

module.exports = router