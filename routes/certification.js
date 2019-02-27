"use strict";
const certificationModel = require('../models/certification.model');
const express = require('express');
const router = express.Router();
router.post("/", (req, res) => {
    if(!req.body){
        return res.status(400).send("Body is missing")
    }
    let model = new certificatioModel(req.body)
    model.save()
        .then((doc) => {
            if(!doc || doc.length ===0){
                return res.status(500).send(doc)
            }

            res.status(200).send(doc)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})
router.put('/', (req, res) => {
    if(!req.query.id_of_certification){
        return res.status(400).send('id of certification is mising.')
    }
    certificationModel.findOneAndUpdate({
        id_of_certification: req.query.id_of_certification
    }, req.body, {
        new: true
    })
        .then((doc) => {
            res.json(doc)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

router.delete('/', (req, res) => {
    if(!req.query.id_of_certification){
        return res.status(400).send('id is mising.')
    }
    certificationModel.findOneAndDelete({
        id_of_certification: req.query.id_of_certification
    })
        .then((doc) => {
            res.json(doc)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

module.exports = router;