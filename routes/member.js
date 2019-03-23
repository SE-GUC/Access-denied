const memberModel = require("./../models/member.Model")
const express = require("express")
const router = express.Router()
const validator = require('../validations/memberValidations.js');




router.post("/", (req, res) => {
    console.log("ok")
    if(!req.body){
        return res.status(400).send("Body is missing")
    }
    const isValidated = validator.createValidation(req.body)
    if (isValidated.error) {
        return res.status(400).send({ error: isValidated.error.details[0].message })
    }
    let model = new memberModel(req.body)
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
        return res.status(400).send("Email is missing.")
    }
    memberModel.findOne({
        email: req.query.email
    })
        .then((doc) => {
            res.json(doc)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})
router.get('/all', (request, response) => {

    let key = {}

    memberModel.find(key).then((document) => {

        if (!document || document.length == 0) {
            return response.status(500).json(document)
        }

        response.status(200).json(document)

    }).catch((error) => {
        response.status(500).json(error)
    })
})


router.put("/", (req, res) => {
    if(!req.query.email){
        return res.status(400).send("Email is missing.")
    }
    const isValidated = validator.updateValidation(req.body)
    if (isValidated.error) return res.status(400).send({ error: isValidated.error.details[0].message })
    memberModel.findOneAndUpdate({
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
        return res.status(400).send("Email is mising.")
    }
    memberModel.findOneAndDelete({
        email: req.query.email
    })
        .then((doc) => {
            res.json(doc)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})
router.get("/testing", (req, res) => {
    res.json("member")

        })
module.exports = router;