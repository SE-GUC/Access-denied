
const educationalorganisations = require("../models/EducationalOrganisation.model");
const express = require("express");
const router = express.Router();

router.post("/",(req,res)=>{
    if(!req.body){
        return res.status(400).send("Body is missing")
    }
    let model=new educationalorganisations(req.body)
    model.save()
    .then((doc)=>{
    if(!doc || doc.length==0)
    {
        return res.status(500).send(doc)
    }
    res.status(201).send(doc) //TODO
})
.catch((err)=>{
    res.status(500).json(err)
})
})


router.get("/",(req,res)=>{
    if(!req.query){
        return res.status(400).send("Missing")
    }
    educationalorganisations.findOne({
     email:req.query.email})
    .then((doc)=>{
        res.json(doc)
    })
.catch((err)=>{
    res.status(500).json(err)
})
})


router.put("/", (req, res) => {
    if(!req.query.email){
        return res.status(400).send("Educational Organisation email is missing.")
    }
    educationalorganisations.findOneAndUpdate({
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

router.delete("/", (req, res) => {
    if(!req.query.email){
        return res.status(400).send("Educational Organisation email is missing.")
    }
    educationalorganisations.findOneAndDelete({
        email: req.query.email
    })
        .then((doc) => {
            res.json(doc)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

module.exports = router;


