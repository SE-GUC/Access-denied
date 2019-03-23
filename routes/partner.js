const partnerModel = require("../models/partner.model")
const express = require("express")
const router = express.Router()
const validator = require("../validations/partnerValidations")

router.post("/", (req, res) => {
    if(!req.body){
        return res.status(400).send("Body is missing")
    }
   const isValidated = validator.createValidation(req.body)
   if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    let model = new partnerModel(req.body)
    model.save()
        .then((doc) => {
            if(!doc || doc.length ===0){
                return res.status(500).send(doc)
            }

            res.status(201).send(doc)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

router.get("/", (req, res) => {
    if(!req.query.email){
        return res.status(400).send("Email is mising.")
    }
    partnerModel.findOne({
        email: req.query.email
    })
        .then((doc) => {
            res.json(doc)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

router.put("/", (req, res) => {
    if(!req.query.email){
        return res.status(400).send("Email is mising.")
    }
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    partnerModel.findOneAndUpdate({
        email: req.query.email},
        req.body, {
        new: true
    })
        .then((doc) => {
            res.json(doc)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

router.get('/all', (req, res) => {
    partnerModel.find({},function(err,parts){
        if(err){
            res.send('smoething wrong')
            next()
        }
        res.json(parts)
    })
    
})

router.delete("/", (req, res) => {
    if(!req.query.email){
        return res.status(400).send("Email is mising.")
    }
    partnerModel.findOneAndDelete({
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