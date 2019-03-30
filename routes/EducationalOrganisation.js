const educationalorganisations = require('../models/EducationalOrganisation.model')
const express = require('express')
const router = express.Router()
const validator = require('../validations/EducationalOrganisationValidations.js')

const educationalorganisations = require("../models/EducationalOrganisation.model");
const express = require("express");
const router = express.Router();
const validator = require('../validations/EducationalOrganisationValidations.js');







educationalorganisationCreate=function(req,res){

    if(!req.body){
        return res.status(400).send("Body is missing")
    }
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
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
}


    



educationalorganisationGet=function(req,res)
{
    if(!req.query.email){
        return res.status(400).send("Missing")
    }
    educationalorganisations.find({
     email:req.query.email}).populate("certificate")
    .then((doc)=>{
        res.json(doc)
    })
.catch((err)=>{
    res.status(500).json(err)
})
}


educationalorganisationUpdate=function(req,res) {
    if(!req.query.email){
        return res.status(400).send("Educational Organisation email is missing.")
    }
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message})
    educationalorganisations.findOneAndUpdate({
        email: req.query.email
      },
      req.body,
      {
        new: true
      }
    )
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
<<<<<<< Updated upstream
})

router.delete('/', (req, res) => {
  if (!req.query.email) {
    return res.status(400).send('Educational Organisation email is missing.')
  }
  educationalorganisations
    .findOneAndDelete({
      email: req.query.email
    })
    .then(doc => {
      res.json(doc)
    })
    .catch(err => {
      res.status(500).json(err)
    })
})
=======
        .then((doc) => {
            res.json(doc)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
}

educationalorganisationDelete= function(req,res) {
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

}


router.post("/",educationalorganisationCreate);
router.get("/",educationalorganisationGet);
router.put("/",educationalorganisationUpdate);
router.delete("/",educationalorganisationDelete);


>>>>>>> Stashed changes

module.exports = router
