require('dotenv').config();
bodyParser =require('body-parser');
express = require("express");
const mongoose =require('mongoose');
const coworkingspaceModel = require('../models/coworkingspace.model')
const router = express.Router();

router.post('/',(req,res)=>{
    console.log(req.body);
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