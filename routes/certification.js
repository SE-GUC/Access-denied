const certificatioModel = require('../models/certification.model')
const express = require('express')
const router = express.Router()


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



router.get("/", (req, res) => {
    if(!req.query.id_of_certification){
        return res.status(400).send("ID of certification is mising.")
    }
    certificatioModel.find({
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