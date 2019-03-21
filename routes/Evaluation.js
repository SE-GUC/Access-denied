
const evaluations = require("../models/Evaluation.model");
const express = require("express");
const router = express.Router();



router.post("/",(req,res)=>{
    if(!req.body){
        return res.status(400).send("Body is missing")
    }
    let model=new evaluations(req.body)
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
    evaluations.findOne({
     evaluationCode:req.query.evaluationCode})
    .then((doc)=>{
        res.json(doc)
    })
.catch((err)=>{
    res.status(500).json(err)
})
})


router.put("/", (req, res) => {
    if(!req.query.evaluationCode){

        return res.status(400).send("evaluation code missing.")
        
    }
   evaluations.findOneAndUpdate({
        evaluationCode: req.query.evaluationCode
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
    if(!req.query.evaluationCode){
        return res.status(400).send("evaluation code is missing")
    }
    evaluations.findOneAndDelete({
        evaluationCode: req.query.evaluationCode
    })
        .then((doc) => {
            res.json(doc)
        })
        .catch((err) => {
            res.status(500).json(err)
        })
})

module.exports = router;
