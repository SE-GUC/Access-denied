"use strict";
const certificationModel = require('../models/certification.model');
const express = require('express');
const router = express.Router();
const validator = require('../validations/certificationValidations.js');
const axios = require('axios')

router.post("/", (req, res) => {

    if (!req.body) {
        return res.status(400).send("Body is missing")
    }
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    let model = new certificationModel(req.body)

    model.save()
        .then((doc) => {
            if (!doc || doc.length === 0) {
                return res.status(500).send(doc)
            }

            res.status(200).send(doc)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

router.put('/', (req, res) => {

    if (!req.query.id_of_certification) {
        return res.status(400).send('id of certification is missing.')
    }
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
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
    if (!req.query.id_of_certification) {
        return res.status(400).send('id is missing.')
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





router.get("/", (req, res) => {
    if (!req.query.id_of_certification) {
        return res.status(400).send("ID of certification is missing.")
    }
    certificationModel.find({

            id_of_certification: req.query.id_of_certification
        })
        .then((doc) => {
            res.json(doc)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

router.post("/offlineEvaluation/",(req,res)=>{
    if(!req||!req.body){
        return res.status(400).send("Body is Missing")
    }
    if(!req.query.id){
        return res.status(400).send("id is Missing")
    }
    axios.post('http://localhost:3000/api/schedule',{})
    .then((response)=>{
        let schedule = response.data._id
        req.body.schedule = schedule
        certificationModel.findByIdAndUpdate(req.query.id,{schedule:response._id})
        .then((doc)=>{
            if(!doc||doc.length===0)
            {
                return res.status(500).send(doc)
            }
            res.status(201).send(doc)
            
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json(err)
    })
})

router.post("/schedule",(req,res)=>{
    if(!req||!req.body){
        return res.status(400).send("Body Is Missing");
    }
    let id = req.query.id
    certificationModel.findById(id)
    .then((doc)=>{
        if(!doc || doc.length ===0){
            return res.status(500).send(doc)
        }
        let scheduleId = doc.schedule
        res.redirect(307,`../schedule/${scheduleId}/slot`)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
    
});

router.get("/schedule",(req,res)=>{
    if(!req||!req.body){
        return res.status(400).send("Body Is Missing");
    }
    let id = req.query.id
    certificationModel.findById(id)
    .then((doc)=>{
        if(!doc || doc.length ===0){
            return res.status(500).send(doc)
        }
        let scheduleId = doc.schedule
        if(!req.query.slot){
        res.redirect(307,`../schedule/${scheduleId}`)}
        else{
            res.redirect(307,`../schedule/${scheduleId}/slot?id=${req.query.slot}`)
        }
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
})

router.put("/schedule",(req,res)=>{
    if(!req||!req.body){
        return res.status(400).send("Body Is Missing");
    }
    let id = req.query.id
    certificationModel.findById(id)
    .then((doc)=>{
        if(!doc || doc.length ===0){
            return res.status(500).send(doc)
        }
        let scheduleId = doc.schedule
        res.redirect(307,`../schedule/${scheduleId}/slot?id=${req.body.slotId}`)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
    
})
router.delete("/schedule",(req,res)=>{
    if(!req||!req.body){
        return res.status(400).send("Body Is Missing");
    }
    let id = req.query.id
    certificationModel.findById(id)
    .then((doc)=>{
        if(!doc || doc.length ===0){
            return res.status(500).send(doc)
        }
        let scheduleId = doc.schedule
        res.redirect(307,`../schedule/${scheduleId}/slot?id=${req.body.slotId}`)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
    
})
module.exports = router;