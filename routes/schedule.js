const ScheduleModel = require('../models/schedule.model')
const express = require("express")
const router = express.Router();

router.post('/',(req,res)=>{
    if(!req || !req.body){
        return res.status(500).send("Body is Missing")
    }
    //Add validation here
    let model =new ScheduleModel(req.body);
    model.save()
    .then((doc)=>{
        if(!doc || doc.length ===0){
            return res.status(500).send(doc)
        }
        res.send(201).send(doc)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
})

module.exports = router;