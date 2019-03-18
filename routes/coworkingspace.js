require('dotenv').config();
bodyParser =require('body-parser');
express = require("express");
const mongoose =require('mongoose');
const coworkingspaceModel = require('../models/coworkingspace.model')
const validator = require('../validations/coworkingspaceValidations.js');

const router = express.Router();

router.post('/',(req,res)=>{
    console.log(req.body);
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    let model = new coworkingspaceModel(req.body);
    model.save()
    .then((doc)=>{
        if(!doc || doc.length === 0){
            return res.status(500).send(doc);
        }
        res.status(201).send(doc)
    }).catch((err)=>{
        res.status(500).json(err)
    })
})

router.get('/',(req,res)=>{
    console.log(req.body);
    if(!req.body.email)
        return res.status(400).send("Email is missing.")
    coworkingspaceModel.findOne({
        email:req.body.email
    })
        .then((doc)=>{
            res.json(doc)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })

})

router.put('/',(req,res)=>{
    if(!req.query.email){
        return res.status(400).send("Email is missing.")
    }
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    coworkingspaceModel.findOneAndUpdate({
        email: req.query.email
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

router.delete('/',(req,res)=>{
    if(!req.query.email){
        return res.status(400).send("Email is missing.")
    }
    coworkingspaceModel.findOneAndDelete({
        email: req.query.email
    })
        .then((doc) => {
            res.json(doc)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

router.get('/all',(req,res)=>{
    coworkingspaceModel.find()
        .then((doc)=>{
            res.json(doc)
        })
        .catch((err)=>{
            res.status(500).json(err)
        })
})

module.exports = router;