const partnerModel = require("../models/partner.model")
const express = require("express")
const router = express.Router()

router.post("/api/partner/create_new_profile", (req, res) => {
    if(!req.body){
        return res.status(400).send("Body is missing")
    }
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

router.get("/api/partner/viewprofile", (req, res) => {
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

router.put("/api/partner/update", (req, res) => {
    if(!req.query.email){
        return res.status(400).send("Email is mising.")
    }
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

router.delete("/api/partner/delete", (req, res) => {
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