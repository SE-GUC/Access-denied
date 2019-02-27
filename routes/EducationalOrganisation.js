const educationalorganisations = require("../models/EducationalOrganisation.model");
const express = require("express");
const router = express.Router();


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

